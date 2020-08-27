import {Component, forwardRef} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {FIELD_REQUIRED_MSG} from '../../message-constants';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PersonFormComponent),
      multi: true
    }
  ]
})
export class PersonFormComponent implements ControlValueAccessor, Validator {
  requiredMessage = FIELD_REQUIRED_MSG;
  maxBirthdate: Date;
  personForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    pseudo: [''],
    gender: [null, Validators.required],
    birthdate: [null, Validators.required],
  });

  get firstName(): AbstractControl {
    return this.personForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.personForm.get('lastName');
  }

  get gender(): AbstractControl {
    return this.personForm.get('gender');
  }

  get birthdate(): AbstractControl {
    return this.personForm.get('birthdate');
  }

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.maxBirthdate = new Date(currentYear - 13, 11, 31);
  }

  registerOnChange(fn: any): void {
    this.personForm.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.personForm.disable() : this.personForm.enable();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.personForm.setValue(obj, {emitEvent: false});
    }
  }

  registerOnTouched(fn: any): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.personForm.valid ? null : {invalidForm: {valid: false, message: 'Some person fields are invalid'}};
  }
}
