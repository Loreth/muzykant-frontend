import {Injectable} from '@angular/core';
import {GENRE, getEndpointUrl} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Genre} from '../../shared/models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends RestService<Genre, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(GENRE));
  }
}
