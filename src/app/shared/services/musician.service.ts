import {Injectable} from '@angular/core';
import {getEndpointUrl, MUSICIAN} from '../RestApiUrls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Musician} from '../models/musician.model';

@Injectable({
  providedIn: 'root'
})
export class MusicianService extends RestService<Musician, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(MUSICIAN));
  }
}
