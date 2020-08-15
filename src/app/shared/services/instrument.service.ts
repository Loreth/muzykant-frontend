import {Injectable} from '@angular/core';
import {getEndpointUrl, INSTRUMENT, VOIVODESHIP} from '../RestApiUrls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RestService} from './rest.service';
import {MusicianWantedAd} from '../models/musician-wanted-ad.model';
import {Voivodeship} from '../models/voivodeship.model';
import {Genre} from '../models/genre.model';
import {Instrument} from '../models/instrument.model';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService extends RestService<Instrument, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(INSTRUMENT));
  }

  protected searchFormToParams(searchForm: AbstractControl): HttpParams {
    return undefined;
  }
}
