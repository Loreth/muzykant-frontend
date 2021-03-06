import {Injectable} from '@angular/core';
import {getEndpointUrl, INSTRUMENT} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Instrument} from '../../shared/models/instrument';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService extends RestService<Instrument, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(INSTRUMENT));
  }
}
