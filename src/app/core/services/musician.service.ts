import {Injectable} from '@angular/core';
import {getEndpointUrl, MUSICIAN} from '../../shared/rest-api-urls';
import {HttpClient} from '@angular/common/http';
import {Musician} from '../../shared/models/musician';
import {RestSearchService} from './rest-search.service';
import {FormSearchService} from './form-search.service';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {userSearchFormToHttpParams} from '../../shared/search-form-utils';

@Injectable({
  providedIn: 'root'
})
export class MusicianService extends RestSearchService<Musician, number> implements FormSearchService<Musician> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(MUSICIAN));
  }

  searchDtosWithForm(searchForm: AbstractControl, page: number, pageSize: number, sortFields?: string[]): Observable<Page<Musician>> {
    const httpParams = userSearchFormToHttpParams(searchForm);
    console.log('searching musicians with params');
    console.log(httpParams.toString());
    return super.searchDtos(httpParams, page, pageSize, sortFields);
  }
}
