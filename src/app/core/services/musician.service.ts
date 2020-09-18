import {Injectable} from '@angular/core';
import {getEndpointUrl, MUSICIAN} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Musician} from '../../shared/models/musician';

@Injectable({
  providedIn: 'root'
})
export class MusicianService extends RestService<Musician, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(MUSICIAN));
  }
}
