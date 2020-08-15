import {Injectable} from '@angular/core';
import {getEndpointUrl, VOIVODESHIP} from '../RestApiUrls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RestService} from './rest.service';
import {MusicianWantedAd} from '../models/musician-wanted-ad.model';
import {Voivodeship} from '../models/voivodeship.model';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VoivodeshipService extends RestService<Voivodeship, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(VOIVODESHIP));
  }

  protected searchFormToParams(searchForm: AbstractControl): HttpParams {
    return undefined;
  }
}
