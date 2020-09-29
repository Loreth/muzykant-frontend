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
import {FIELD_REQUIRED_MSG} from '../../localization/message-constants';
import {merge, Observable, timer} from 'rxjs';
import {Voivodeship} from '../../models/voivodeship';
import {CustomAsyncValidators} from '../../../core/validators/custom-async-validators';
import {UserService} from '../../../core/services/user.service';
import {filter, map, startWith, take} from 'rxjs/operators';
import {Comparators} from '../../comparators';

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
      asyncValidators: CustomAsyncValidators.uniqueLinkName(this.userService)
    }]
  });
  @Input() parentSubmittedStatus: Observable<boolean>;
  @Input() disabledLinkName: boolean;
  @Input() disabledLinkNameHint: boolean;
  compareById = Comparators.compareById;

  get voivodeship(): AbstractControl {
    return this.userForm.get('voivodeship');
  }

  get city(): AbstractControl {
    return this.userForm.get('city');
  }

  get linkName(): AbstractControl {
    return this.userForm.get('linkName');
  }

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.disabledLinkName) {
      this.linkName.clearValidators();
      this.linkName.clearAsyncValidators();
    }

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
      this.voivodeship.setValue(obj.voivodeship, {emitEvent: true});
      this.linkName.setValue(obj.linkName, {emitEvent: true});
      this.city.setValue(obj.city, {emitEvent: true});
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
