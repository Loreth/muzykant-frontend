import {Identifiable} from '../../shared/models/identifiable.model';
import {RestService} from './rest.service';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {catchError, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

export abstract class RestSearchService<T extends Identifiable<ID>, ID> extends RestService<T, ID> {
  searchDtos(searchParams: HttpParams, page: number = 0, pageSize: number = 20, sortFields?: string[]): Observable<Page<T>> {
    const searchUrl = `${this.endpointUrl}/search`;
    searchParams = searchParams
    .set('page', page.toString())
    .set('size', pageSize.toString());

    if (sortFields) {
      searchParams = searchParams.set('sort', sortFields.toString());
    }

    return this.http.get<Page<T>>(searchUrl, {params: searchParams}).pipe(
      tap(x => x.size ?
        console.log(`found ${x.content.length} dtos under "${this.endpointUrl}?${searchParams}"`) :
        console.log(`no dtos under "${this.endpointUrl}?${searchParams}"`)),
      catchError(this.handleError<Page<T>>('searchDtos', new Page()))
    );
  }
}
