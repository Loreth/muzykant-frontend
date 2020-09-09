import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, first, map, switchMap, take} from 'rxjs/operators';

export class UniqueLinkNameValidator {

  static validate(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.valueChanges) {
        return of(null);
      }

      return control.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => userService.isLinkNameTaken(value)),
        map(taken => (taken ? {uniqueLinkName: true} : null))
      ).pipe(first());
    };
  }
}
