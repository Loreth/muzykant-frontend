import {Injectable} from '@angular/core';
import {getEndpointUrl, INSTRUMENT} from '../RestApiUrls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Instrument} from '../models/instrument.model';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService extends RestService<Instrument, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(INSTRUMENT));
  }
}
