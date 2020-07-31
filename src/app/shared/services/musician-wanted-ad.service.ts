import {Injectable} from '@angular/core';
import {getEndpointUrl, MUSICIAN_WANTED_AD} from '../RestApiUrls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {MusicianWantedAd} from '../models/musician-wanted-ad.model';

@Injectable({
  providedIn: 'root'
})
export class MusicianWantedAdService extends RestService<MusicianWantedAd, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(MUSICIAN_WANTED_AD));
  }
}
