import {Injectable} from '@angular/core';
import {getEndpointUrl, VOIVODESHIP} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Voivodeship} from '../../shared/models/voivodeship';

@Injectable({
  providedIn: 'root'
})
export class VoivodeshipService extends RestService<Voivodeship, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(VOIVODESHIP));
  }
}
