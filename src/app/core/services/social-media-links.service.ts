import {Injectable} from '@angular/core';
import {getEndpointUrl, SOCIAL_MEDIA_LINKS} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {SocialMediaLinks} from '../../shared/models/social-media-links';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaLinksService extends RestService<SocialMediaLinks, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(SOCIAL_MEDIA_LINKS));
  }


  updateDto(dto: SocialMediaLinks): Observable<SocialMediaLinks> {
    const url = `${this.endpointUrl}/${dto.userId}`;
    return this.http.put(url, dto, this.httpOptions).pipe(
      tap(_ => console.log(`updated Dto w/ id=${dto.id}`)),
      catchError(this.handleError<any>('updateDto'))
    );
  }
}
