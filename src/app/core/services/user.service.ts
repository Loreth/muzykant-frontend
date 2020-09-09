import {Injectable} from '@angular/core';
import {getEndpointUrl, USER} from '../../shared/rest-api-urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../shared/models/user';
import {RestSearchService} from './rest-search.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestSearchService<User, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(USER));
  }

  isLinkNameTaken(linkName: string): Observable<boolean> {
    const httpParams = new HttpParams().set('linkName', linkName);
    return this.searchDtos(httpParams).pipe(map(page => page.content?.length > 0));
  }
}
