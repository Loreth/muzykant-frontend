import {Injectable} from '@angular/core';
import {GENRE, getEndpointUrl} from '../RestApiUrls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Genre} from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends RestService<Genre, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(GENRE));
  }
}
