import {FormGroup, ValidatorFn} from '@angular/forms';

export class CustomValidators {

  static matchingValidator(controlName: string, matchToControlName: string): ValidatorFn {
    return (group: FormGroup) => {
      const control = group.get(controlName);
      const controlToMatch = group.get(matchToControlName);

      if (!(control && controlToMatch)) {
        return null;
      }

      if (control.errors && !control.errors.matching) {
        return null;
      }

      if (control.value !== controlToMatch.value) {
        control.setErrors({matching: true});
      } else {
        control.setErrors(null);
      }
    };
  }
}
