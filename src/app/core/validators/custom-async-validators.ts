import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

export class CustomAsyncValidators {

  static uniqueLinkName(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(300).pipe(
        switchMap(() => userService.isLinkNameTaken(control.value)),
        map(taken => (taken ? {uniqueLinkName: true} : null)));
    };
  }
}
