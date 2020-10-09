import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {ChatMessage} from '../../shared/models/chat-message';
import {Conversation} from '../../shared/models/conversation';
import {ActivatedRoute} from '@angular/router';
import {ChatMessageService} from '../../core/services/chat-message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  newMessage$ = new Subject<ChatMessage>();
  currentConversation$ = new Subject<Conversation>();
  recipientLinkName: string;

  constructor(private chatMessageService: ChatMessageService, route: ActivatedRoute) {
    this.recipientLinkName = route.snapshot.paramMap.get('recipient');
  }

  ngOnInit(): void {
    this.subscription = this.chatMessageService.getChatQueue().subscribe(message => {
      this.newMessage$.next(JSON.parse(message.body));
    });
  }

  onConversationChange(newConversation: Conversation): void {
    console.log('changing conversation');
    if (newConversation.lastMessage) {
      newConversation.lastMessage.seen = true;
    }
    this.chatMessageService.markMessagesFromUserAsSeen(newConversation.secondParticipantLinkName);
    this.currentConversation$.next(newConversation);
  }

  onMessageSent(chatMessage: ChatMessage): void {
    this.newMessage$.next(chatMessage);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
