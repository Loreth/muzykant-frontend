import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Identifiable} from '../models/identifiable.model';

export abstract class RestService<T extends Identifiable<ID>, ID> {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  protected constructor(private http: HttpClient, private endpointUrl: string) {
  }

  getDtos(): Observable<T[]> {
    return this.http.get<T[]>(this.endpointUrl)
    .pipe(
      tap(_ => console.log('fetched Dtos from' + this.endpointUrl)),
      catchError(this.handleError<T[]>('getDtos', []))
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

  searchDtos(httpParams: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(this.endpointUrl, {params: httpParams}).pipe(
      tap(x => x.length ?
        console.log(`found dtos matching "${httpParams}"`) :
        console.log(`no dtos matching "${httpParams}"`)),
      catchError(this.handleError<T[]>('searchDtos', []))
    );
  }


  private handleError<U>(operation = 'operation', result?: U): (error: any) => Observable<U> {
    return (error: any): Observable<U> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as U);
    };
  }
}
