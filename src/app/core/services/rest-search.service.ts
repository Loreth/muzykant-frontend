import {RestService} from './rest.service';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {catchError, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {SEARCH} from '../../shared/rest-api-urls';
import {Identifiable} from '../../shared/models/identifiable';
import {FormSearchService} from './form-search.service';
import {AbstractControl} from '@angular/forms';

export abstract class RestSearchService<T extends Identifiable<ID>, ID> extends RestService<T, ID> implements FormSearchService<T> {
  searchDtos(searchParams: HttpParams, page: number = 0, pageSize: number = 20, sortFields?: string[]): Observable<Page<T>> {
    const searchUrl = this.endpointUrl + SEARCH;
    searchParams = searchParams
    .set('page', page.toString())
    .set('size', pageSize.toString());

    if (sortFields) {
      for (const sortField of sortFields) {
        searchParams = searchParams.append('sort', sortField);
      }
    }

    return this.http.get<Page<T>>(searchUrl, {params: searchParams}).pipe(
      tap(x => x.size ?
        console.log(`found ${x.content.length} dtos under "${this.endpointUrl}?${searchParams}"`) :
        console.log(`no dtos under "${this.endpointUrl}?${searchParams}"`)),
      catchError(this.handleError<Page<T>>('searchDtos', new Page()))
    );
  }

  searchDtosWithForm(searchForm: AbstractControl, page: number, pageSize: number, sortFields?: string[]): Observable<Page<T>> {
    console.error('searchDtosWithForm not overriden!');
    return undefined;
  }
}
