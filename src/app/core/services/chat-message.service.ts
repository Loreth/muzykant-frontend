import {Injectable} from '@angular/core';
import {CHAT_MESSAGE, CONVERSATIONS, getEndpointUrl} from '../../shared/rest-api-urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RestSearchService} from './rest-search.service';
import {ChatMessage} from '../../shared/models/chat-message';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {Page} from '../../shared/models/pagination/page';
import {catchError, tap} from 'rxjs/operators';
import {Conversation} from '../../shared/models/conversation';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService extends RestSearchService<ChatMessage, number> {
  constructor(httpClient: HttpClient, private rxStompService: RxStompService) {
    super(httpClient, getEndpointUrl(CHAT_MESSAGE));
  }

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    this.rxStompService.publish({destination: '/app/chat', body: JSON.stringify(message)});
    message.sentAt = new Date().toJSON();
    return of(message);
  }

  watchUserChatQueue(): Observable<Message> {
    return this.rxStompService.watch('/user/queue/chat');
  }

  getLatestMessagesFromConversationWithUser(
    userLinkName: string, page = 0, pageSize = 15, sentBeforeMessageId?: number): Observable<Page<ChatMessage>> {
    let httpParams = new HttpParams()
    .append('participantLinkName', AuthService.loggedUserLinkName)
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
}
