import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {USER_CHAT_QUEUE} from '../../shared/websocket-destinations';
import {Subject, Subscription} from 'rxjs';
import {ChatMessage} from '../../shared/models/chat-message';
import {Conversation} from '../../shared/models/conversation';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private rxStompService: RxStompService, route: ActivatedRoute) {
    this.recipientLinkName = route.snapshot.paramMap.get('recipient');
  }

  ngOnInit(): void {
    this.subscription = this.rxStompService.watch(USER_CHAT_QUEUE).subscribe(message => {
      this.newMessage$.next(JSON.parse(message.body));
    });
  }

  onConversationChange(newConversation: Conversation): void {
    console.log('changing conversation');
    this.currentConversation$.next(newConversation);
  }

  onMessageSent(chatMessage: ChatMessage): void {
    this.newMessage$.next(chatMessage);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
