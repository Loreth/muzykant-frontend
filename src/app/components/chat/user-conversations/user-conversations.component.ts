import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {ChatMessage} from '../../../shared/models/chat-message';
import {ChatMessageService} from '../../../core/services/chat-message.service';
import {Conversation} from '../../../shared/models/conversation';
import {AuthService} from '../../../core/services/auth.service';

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
  conversations: Conversation[];

  constructor(private chatMessageService: ChatMessageService) {
  }

  ngOnInit(): void {
    this.subscription = this.newMessage$.subscribe(message => {
      this.conversations.filter(conversation =>
        conversation.secondParticipantLinkName === message.senderLinkName ||
        conversation.firstParticipantLinkName === message.senderLinkName)[0].lastMessage = message;
    });
    this.chatMessageService.getUserConversations(AuthService.loggedUserId).subscribe(
      conversations => this.conversations = conversations
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectConversation(conversation: Conversation): void {
    this.currentConversation = conversation;
    this.selectedConversation.emit(conversation);
  }

  getLoggedUserLinkName(): string {
    return AuthService.loggedUserLinkName;
  }
}
