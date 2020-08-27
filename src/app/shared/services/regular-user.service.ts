import {Injectable} from '@angular/core';
import {getEndpointUrl, REGULAR_USER} from '../rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {RegularUser} from '../models/regular-user.model';

@Injectable({
  providedIn: 'root'
})
export class RegularUserService extends RestService<RegularUser, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(REGULAR_USER));
  }
}
