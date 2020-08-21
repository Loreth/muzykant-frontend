import {Identifiable} from '../models/identifiable.model';
import {Observable} from 'rxjs';
import {Page} from '../models/pagination/page';
import {AbstractControl} from '@angular/forms';

export interface FormSearchService<T extends Identifiable<any>> {
  searchDtosWithForm(searchForm: AbstractControl, page: number, pageSize: number, sortFields?: string[]): Observable<Page<T>>;
}
