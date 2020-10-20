import {Injectable} from '@angular/core';
import {EQUIPMENT, getEndpointUrl} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {Equipment} from '../../shared/models/equipment';
import {RestSearchService} from './rest-search.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends RestSearchService<Equipment, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(EQUIPMENT));
  }
}
