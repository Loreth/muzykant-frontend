import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatMessage} from '../../../shared/models/chat-message';
import {Observable, Subscription} from 'rxjs';
import {ChatMessageService} from '../../../core/services/chat-message.service';
import {Conversation} from '../../../shared/models/conversation';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-ngx';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  @Input() conversation$: Observable<Conversation>;
  @Input() newMessage$: Observable<ChatMessage>;
  conversation: Conversation;
  messages: ChatMessage[] = [];
  loading: boolean;

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
    this.subscription.add(this.newMessage$.subscribe(message => this.messages.push(message)));
  }

  ngAfterViewInit(): void {
    this.osComponent.osInstance().getElements().viewport.addEventListener('scroll', () => this.onChatScroll());
  }

  fetchMoreMessages(): void {
    this.loading = true;
    const lastMessageId = this.messages[this.messages.length - 1]?.id;
    const pageToLoad = Math.floor(this.messages.length / 15);
    this.chatMessageService.getLatestMessagesFromConversationWithUser(
      this.conversation.secondParticipantLinkName, pageToLoad, 15, lastMessageId).subscribe(
      page => {
        this.messages.unshift(...page.content.reverse());
        this.loading = false;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
