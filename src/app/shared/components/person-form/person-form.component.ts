import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {FIELD_REQUIRED_MSG} from '../../localization/message-constants';
import {Observable} from 'rxjs';
// @ts-ignore
import moment, {Moment} from 'moment';

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
export class PersonFormComponent implements ControlValueAccessor, Validator, OnInit {
  requiredMessage = FIELD_REQUIRED_MSG;
  maxBirthdate: Moment;
  minBirthdate: Moment;
  genderClass;
  personForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    pseudo: [''],
    gender: [null, Validators.required],
    birthdate: ['', Validators.required],
  });
  @ViewChild(FormGroupDirective) personFormDirective: FormGroupDirective;
  @Input() parentSubmittedStatus: Observable<boolean>;

  get firstName(): AbstractControl {
    return this.personForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.personForm.get('lastName');
  }

  get pseudo(): AbstractControl {
    return this.personForm.get('pseudo');
  }

  get gender(): AbstractControl {
    return this.personForm.get('gender');
  }

  get birthdate(): AbstractControl {
    return this.personForm.get('birthdate');
  }

  constructor(private fb: FormBuilder) {
    const currentYear = moment().year();
    this.maxBirthdate = moment([currentYear - 13, 11, 31]);
    this.minBirthdate = moment([1900, 0, 1]);
  }

  ngOnInit(): void {
    this.parentSubmittedStatus.subscribe(() => {
      this.personForm.markAllAsTouched();
      this.genderClass = 'warn-text';
    });
  }

  registerOnChange(fn: any): void {
    this.personForm.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.personForm.disable() : this.personForm.enable();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.firstName.setValue(obj.firstName, {emitEvent: false});
      this.lastName.setValue(obj.lastName, {emitEvent: false});
      this.birthdate.setValue(obj.birthdate, {emitEvent: false});
      this.gender.setValue(obj.gender, {emitEvent: false});
      this.pseudo.setValue(obj.pseudo, {emitEvent: false});
    }
  }

  registerOnTouched(fn: any): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.personForm.valid ? null : {invalidForm: {valid: false, message: 'Some person fields are invalid'}};
  }
}
