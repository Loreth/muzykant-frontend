import {Observable} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {AbstractControl} from '@angular/forms';
import {Identifiable} from '../../shared/models/identifiable';

export interface FormSearchService<T extends Identifiable<any>> {
  searchDtosWithForm(searchForm: AbstractControl, page: number, pageSize: number, sortFields?: string[]): Observable<Page<T>>;
}
