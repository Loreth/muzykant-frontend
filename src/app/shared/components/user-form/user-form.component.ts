import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  FormBuilder,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {FIELD_REQUIRED_MSG} from '../../message-constants';
import {merge, Observable, timer} from 'rxjs';
import {Voivodeship} from '../../models/voivodeship.model';
import {UniqueLinkNameValidator} from '../../../core/validators/uniqueLinkNameValidator';
import {UserService} from '../../../core/services/user.service';
import {filter, map, startWith, take} from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFormComponent),
      multi: true
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UserFormComponent),
      multi: true
    }
  ]
})
export class UserFormComponent implements ControlValueAccessor, AsyncValidator, OnInit {
  requiredMessage = FIELD_REQUIRED_MSG;
  @Input() voivodeships$: Observable<Voivodeship[]>;
  userForm = this.fb.group({
    voivodeship: [null, Validators.required],
    city: [''],
    linkName: ['', {
      validators: [Validators.required, Validators.pattern('[a-z0-9_]+')],
      asyncValidators: UniqueLinkNameValidator.validate(this.userService)
    }]
  });
  @Input() parentSubmittedStatus: Observable<boolean>;

  get voivodeship(): AbstractControl {
    return this.userForm.get('voivodeship');
  }

  get linkName(): AbstractControl {
    return this.userForm.get('linkName');
  }

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.parentSubmittedStatus.subscribe(() => {
      this.userForm.markAllAsTouched();
    });
  }

  registerOnChange(fn: any): void {
    this.userForm.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.userForm.disable() : this.userForm.enable();
  }

  writeValue(obj: any): void {
    if (obj != null && obj !== '') {
      this.userForm.setValue(obj, {emitEvent: true});
      setTimeout(() => {
        this.userForm.updateValueAndValidity();
      });
    }
  }

  registerOnTouched(fn: any): void {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return merge(this.userForm.statusChanges, timer(0, 1000)).pipe(
      map(() => this.userForm.status),
      startWith(this.userForm.status),
      filter(value => value !== 'PENDING'),
      take(1),
      map(() => {
        return this.userForm.valid ? null : {invalid: true};
      })
    );
  }
}
