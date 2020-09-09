import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  FormBuilder,
  FormGroupDirective,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {FIELD_REQUIRED_MSG} from '../../message-constants';
import {Observable, of} from 'rxjs';
import {Voivodeship} from '../../models/voivodeship.model';
import {UniqueLinkNameValidator} from '../../../core/validators/uniqueLinkNameValidator';
import {UserService} from '../../../core/services/user.service';
import {map} from 'rxjs/operators';

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
  @ViewChild(FormGroupDirective) personFormDirective: FormGroupDirective;
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
    if (obj) {
      this.userForm.setValue(obj, {emitEvent: false});
    }
  }

  registerOnTouched(fn: any): void {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userForm.statusChanges.pipe(map(status => {
        if (status === 'VALID') {
          control.setErrors(null);
        }
        if (status === 'INVALID') {
          control.setErrors({invalid: true});
        }

        return status === 'VALID' ? null : {invalid: true};
      }),
    );
  }
}
