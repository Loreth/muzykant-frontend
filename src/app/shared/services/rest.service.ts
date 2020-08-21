import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Identifiable} from '../models/identifiable.model';
import {Page} from '../models/pagination/page';

export abstract class RestService<T extends Identifiable<ID>, ID> {
  private static readonly DEFAULT_PAGE = 0;
  private static readonly DEFAULT_PAGE_SIZE = 20;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  protected constructor(protected http: HttpClient, protected endpointUrl: string) {
  }

  getDtosPage(page: number = RestService.DEFAULT_PAGE,
              pageSize: number = RestService.DEFAULT_PAGE_SIZE,
              sortFields?: string[]): Observable<Page<T>> {
    let httpParams = new HttpParams()
    .set('page', page.toString())
    .set('size', pageSize.toString());

    if (sortFields) {
      httpParams = httpParams.set('sort', sortFields.toString());
    }

    return this.http.get<Page<T>>(this.endpointUrl, {params: httpParams})
    .pipe(
      tap(x => console.log(`fetched ${x.content.length} Dtos from ${this.endpointUrl}?${httpParams.toString()}`)),
      catchError(this.handleError<Page<T>>('getDtos', new Page()))
    );
  }

  getDto(id: number): Observable<T> {
    const url = `${this.endpointUrl}/${id}`;
    return this.http.get<T>(url).pipe(
      tap(_ => console.log(`fetched Dto w/ id=${id} on url ${this.endpointUrl}`)),
      catchError(this.handleError<T>(`getDto id=${id}`))
    );
  }

  updateDto(dto: T): Observable<any> {
    const url = `${this.endpointUrl}/${dto.id}`;
    return this.http.put(url, dto, this.httpOptions).pipe(
      tap(_ => console.log(`updated Dto w/ id=${dto.id}`)),
      catchError(this.handleError<any>('updateDto'))
    );
  }

  addDto(dto: T): Observable<T> {
    return this.http.post<T>(this.endpointUrl, dto, this.httpOptions).pipe(
      tap((newDto: T) => console.log(`added Dto w/ id=${newDto.id}`)),
      catchError(this.handleError<T>('addDto'))
    );
  }

  deleteDto(dtoOrId: T | number): Observable<T> {
    const id = typeof dtoOrId === 'number' ? dtoOrId : dtoOrId.id;
    const url = `${this.endpointUrl}/${id}`;

    return this.http.delete<T>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Dto w/ id=${id}`)),
      catchError(this.handleError<T>('deleteDto'))
    );
  }

  protected handleError<U>(operation = 'operation', result?: U): (error: any) => Observable<U> {
    return (error: any): Observable<U> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as U);
    };
  }
}
