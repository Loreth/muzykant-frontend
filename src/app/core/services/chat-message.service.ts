import {Injectable} from '@angular/core';
import {CHAT_MESSAGE, CONVERSATIONS, getEndpointUrl} from '../../shared/rest-api-urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RestSearchService} from './rest-search.service';
import {ChatMessage} from '../../shared/models/chat-message';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Observable, of} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {catchError, share, tap} from 'rxjs/operators';
import {Conversation} from '../../shared/models/conversation';
import {SEEN_CONVERSATION, SEEN_MESSAGES_QUEUE, SEND_CHAT_MESSAGE, USER_CHAT_QUEUE} from '../../shared/websocket-destinations';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService extends RestSearchService<ChatMessage, number> {
  senderLinkNamesOfUnseenMessages: string[] = [];
  private chatQueue: Observable<Message>;

  constructor(httpClient: HttpClient, private rxStompService: RxStompService) {
    super(httpClient, getEndpointUrl(CHAT_MESSAGE));
  }

  initialize(loggedUserId: number): void {
    this.getUserConversations(loggedUserId).subscribe(
      conversations => {
        this.senderLinkNamesOfUnseenMessages = conversations
        .filter(x => !x.lastMessage.seen)
        .map(conversation => conversation.secondParticipantLinkName);

        this.watchSeenChatMessagesQueue().subscribe(
          message => {
            const seenMessages: ChatMessage[] = JSON.parse(message.body);
            const indexOfSenderLinkName = this.senderLinkNamesOfUnseenMessages.indexOf(seenMessages[0].senderLinkName);
            if (indexOfSenderLinkName > -1) {
              this.senderLinkNamesOfUnseenMessages.splice(indexOfSenderLinkName, 1);
            }
          }
        );
      }
    );

    this.chatQueue = this.watchUserChatQueue();
  }

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    this.rxStompService.publish({destination: SEND_CHAT_MESSAGE, body: JSON.stringify(message)});
    message.sentAt = new Date().toJSON();
    return of(message);
  }

  private watchUserChatQueue(): Observable<Message> {
    return this.rxStompService.watch(USER_CHAT_QUEUE).pipe(
      tap(message => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        if (!this.senderLinkNamesOfUnseenMessages.includes(chatMessage.senderLinkName)) {
          this.senderLinkNamesOfUnseenMessages.push(chatMessage.senderLinkName);
        }
      }),
      share()
    );
  }

  watchSeenChatMessagesQueue(): Observable<Message> {
    return this.rxStompService.watch(SEEN_MESSAGES_QUEUE);
  }

  getLatestMessagesFromConversationWithUser(loggedUserLinkName: string, userLinkName: string, page = 0,
                                            pageSize = 15, sentBeforeMessageId?: number): Observable<Page<ChatMessage>> {
    let httpParams = new HttpParams()
    .append('participantLinkName', loggedUserLinkName)
    .append('participantLinkName', userLinkName);
    if (sentBeforeMessageId) {
      httpParams = httpParams.set('sentBeforeMessageId', String(sentBeforeMessageId));
    }

    return super.searchDtos(httpParams, page, pageSize, ['sentAt,DESC', 'id,DESC']);
  }

  getUserConversations(userId: number): Observable<Conversation[]> {
    const url = this.endpointUrl + CONVERSATIONS;
    const httpParams = new HttpParams().set('userId', String(userId));
    return this.http.get<Conversation[]>(url, {params: httpParams}).pipe(
      tap(conversations => console.log(`fetched ${conversations.length} User Conversations url: ${url}`)),
      catchError(this.handleError<Conversation[]>('getUserConversations'))
    );
  }

  markMessagesFromUserAsSeen(userLinkName: string): void {
    this.rxStompService.publish({destination: SEEN_CONVERSATION, body: userLinkName});
  }

  getChatQueue(): Observable<Message> {
    return this.chatQueue;
  }

  getUnseenConversationsCount(): number {
    return this.senderLinkNamesOfUnseenMessages.length;
  }
}
