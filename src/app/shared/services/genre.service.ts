import {Injectable} from '@angular/core';
import {GENRE, getEndpointUrl, VOIVODESHIP} from '../RestApiUrls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RestService} from './rest.service';
import {MusicianWantedAd} from '../models/musician-wanted-ad.model';
import {Voivodeship} from '../models/voivodeship.model';
import {Genre} from '../models/genre.model';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GenreService extends RestService<Genre, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(GENRE));
  }

  protected searchFormToParams(searchForm: AbstractControl): HttpParams {
    return undefined;
  }
}
