import {Injectable} from '@angular/core';
import {BAND, getEndpointUrl} from '../rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Band} from '../models/band.model';

@Injectable({
  providedIn: 'root'
})
export class BandService extends RestService<Band, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(BAND));
  }
}
