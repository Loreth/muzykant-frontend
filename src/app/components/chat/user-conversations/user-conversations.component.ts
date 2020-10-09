import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {ChatMessage} from '../../../shared/models/chat-message';
import {ChatMessageService} from '../../../core/services/chat-message.service';
import {Conversation} from '../../../shared/models/conversation';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user-conversations',
  templateUrl: './user-conversations.component.html',
  styleUrls: ['./user-conversations.component.css']
})
export class UserConversationsComponent implements OnInit, OnDestroy {
  @Output() selectedConversation = new EventEmitter<Conversation>();
  currentConversation: Conversation;
  private subscription: Subscription;
  @Input() newMessage$ = new Subject<ChatMessage>();
  @Input() recipientLinkName: string;
  conversations: Conversation[] = [];

  constructor(private chatMessageService: ChatMessageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = this.newMessage$.subscribe(message => {
      const filteredConversations = this.conversations.filter(conversation =>
        conversation.firstParticipantLinkName === message.recipientLinkName &&
        conversation.secondParticipantLinkName === message.senderLinkName ||
        conversation.firstParticipantLinkName === message.senderLinkName &&
        conversation.secondParticipantLinkName === message.recipientLinkName);

      if (filteredConversations.length) {
        filteredConversations[0].lastMessage = message;
      } else {
        this.makeNewConversation(message.senderLinkName, message).subscribe(
          newConversation => this.conversations.push(newConversation)
        );
      }
    });

    this.chatMessageService.getUserConversations(AuthService.loggedUserId).subscribe(
      conversations => {
        this.conversations.push(...conversations);
        if (this.recipientLinkName) {
          this.handleNewRecipient();
        }
      }
    );
  }

  private handleNewRecipient(): void {
    console.log('received new recipientLinkName: ' + this.recipientLinkName);
    const conversationWithUser = this.getConversationWithUser(this.recipientLinkName);
    if (conversationWithUser) {
      this.selectConversation(conversationWithUser);
    } else {
      this.makeNewConversation(this.recipientLinkName).subscribe(
        newConversation => {
          this.conversations.unshift(newConversation);
          this.selectConversation(newConversation);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectConversation(conversation: Conversation): void {
    if (this.currentConversation !== conversation) {
      this.currentConversation = conversation;
      this.selectedConversation.emit(conversation);
    }
  }

  getLoggedUserLinkName(): string {
    return AuthService.loggedUserLinkName;
  }

  private makeNewConversation(otherUserLinkName: string, lastMessage?: ChatMessage): Observable<Conversation> {
    console.log('making new conversation for ' + otherUserLinkName);
    return this.userService.searchDtos(new HttpParams().set('linkName', otherUserLinkName)).pipe(
      map(page => {
        const sender = page.content[0];
        const newConversation: Conversation = {
          firstParticipantDisplayName: AuthService.userDisplayName,
          firstParticipantLinkName: AuthService.loggedUserLinkName,
          firstParticipantProfileImageLink: AuthService.userProfileImageLink,
          secondParticipantDisplayName: sender.displayName,
          secondParticipantLinkName: sender.linkName,
          secondParticipantProfileImageLink: sender.profileImageLink,
          lastMessage
        };
        return newConversation;
      })
    );
  }

  private getConversationWithUser(otherUserLinkName: string): Conversation {
    return this.conversations.filter(conversation =>
      conversation.firstParticipantLinkName === otherUserLinkName ||
      conversation.secondParticipantLinkName === otherUserLinkName)[0];
  }

  isLastMessageFromOtherUserAndUnseen(message: ChatMessage): boolean {
    return message?.seen === false && message?.recipientLinkName === AuthService.loggedUserLinkName;
  }
}
