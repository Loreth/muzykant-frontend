import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ChatMessage} from '../../../shared/models/chat-message';
import {Observable, Subscription} from 'rxjs';
import {ChatMessageService} from '../../../core/services/chat-message.service';
import {Conversation} from '../../../shared/models/conversation';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-ngx';
import {AuthService} from '../../../core/services/auth.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  @Input() conversation$: Observable<Conversation>;
  @Input() newMessage$: Observable<ChatMessage>;
  @Output() messageSent = new EventEmitter<ChatMessage>();
  conversation: Conversation;
  messages: ChatMessage[] = [];
  loading: boolean;
  inputField = new FormControl();

  @ViewChild('osComponent', {read: OverlayScrollbarsComponent})
  osComponent: OverlayScrollbarsComponent;

  constructor(private chatMessageService: ChatMessageService) {
  }

  ngOnInit(): void {
    this.subscription = this.conversation$.subscribe(conversation => {
      this.messages = [];
      this.conversation = conversation;
      this.fetchMoreMessages();
    });
    this.subscription.add(this.newMessage$.subscribe(message => {
      if (this.conversation?.secondParticipantLinkName === message.senderLinkName ||
        this.conversation?.firstParticipantLinkName === message.senderLinkName) {
        this.messages.push(message);
        setTimeout(() => this.osComponent.osInstance().scroll({top: '100%'}, 300));
      }
    }));
  }

  ngAfterViewInit(): void {
    this.osComponent.osInstance().getElements().viewport.addEventListener('scroll', () => this.onChatScroll());
  }

  fetchMoreMessages(): void {
    this.loading = true;
    const lastMessageId = this.messages[0]?.id;
    this.chatMessageService.getLatestMessagesFromConversationWithUser(
      this.conversation.secondParticipantLinkName, 0, 12, lastMessageId).subscribe(
      page => {
        const osInstance = this.osComponent.osInstance();
        this.messages.unshift(...page.content.reverse());
        this.loading = false;
        setTimeout(() => {
          if (this.messages.length === 12) {
            osInstance.scroll({top: '100%'});
          }
        });
      }
    );
  }

  onChatScroll(): void {
    const scrollInfo = this.osComponent.osInstance().scroll();
    if (scrollInfo.ratio.y === 0) {
      if (!this.loading) {
        this.fetchMoreMessages();
      }
    }
  }

  getMessageClass(message: ChatMessage): string {
    return message.senderLinkName === AuthService.loggedUserLinkName ? 'logged-user-message' : 'other-user-message';
  }

  sendMessage(conversation: Conversation): void {
    if (this.inputField.value?.length) {
      const message: ChatMessage = {
        id: null,
        sentAt: null,
        senderLinkName: AuthService.loggedUserLinkName,
        content: this.inputField.value,
        recipientLinkName: conversation.secondParticipantLinkName
      };
      this.chatMessageService.sendMessage(message).subscribe(
        sentMessage => {
          this.messageSent.emit(sentMessage);
          setTimeout(() => this.osComponent.osInstance().scroll({top: '100%'}, 300));
        }
      );
      this.inputField.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
