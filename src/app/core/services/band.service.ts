import {Injectable} from '@angular/core';
import {BAND, getEndpointUrl} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {Band} from '../../shared/models/band';
import {RestSearchService} from './rest-search.service';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {userSearchFormToHttpParams} from '../../shared/search-form-utils';

@Injectable({
  providedIn: 'root'
})
export class BandService extends RestSearchService<Band, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(BAND));
  }

  searchDtosWithForm(searchForm: AbstractControl, page: number, pageSize: number, sortFields?: string[]): Observable<Page<Band>> {
    const httpParams = userSearchFormToHttpParams(searchForm);
    console.log('searching bands with params');
    console.log(httpParams.toString());
    return super.searchDtos(httpParams, page, pageSize, sortFields);
  }
}
