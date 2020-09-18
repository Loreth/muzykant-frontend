import {Injectable} from '@angular/core';
import {BAND, getEndpointUrl} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Band} from '../../shared/models/band';

@Injectable({
  providedIn: 'root'
})
export class BandService extends RestService<Band, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(BAND));
  }
}
