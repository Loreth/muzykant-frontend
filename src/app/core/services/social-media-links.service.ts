import {Injectable} from '@angular/core';
import {getEndpointUrl, SOCIAL_MEDIA_LINKS} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {SocialMediaLinks} from '../../shared/models/social-media-links';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaLinksService extends RestService<SocialMediaLinks, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(SOCIAL_MEDIA_LINKS));
  }
}
