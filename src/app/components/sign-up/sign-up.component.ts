import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {FIELD_REQUIRED_MSG} from '../../shared/localization/message-constants';
import {AuthService} from '../../core/services/auth.service';
import {SignUpRequest} from '../../shared/models/sign-up-request';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {CustomValidators} from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  requiredMessage = FIELD_REQUIRED_MSG;
  hidePassword = true;
  hideConfirmPassword = true;
  snackbarDurationInSeconds = 9;
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    person: new FormControl()
  }, {validators: CustomValidators.matchingValidator('confirmPassword', 'password')});
  @ViewChild(FormGroupDirective) signUpFormDirective: FormGroupDirective;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  get email(): AbstractControl {
    return this.signUpForm.get('email');
  }

  get password(): AbstractControl {
    return this.signUpForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.signUpForm.get('confirmPassword');
  }

  openSnackBar(statusCode: number): void {
    let message = 'Coś poszło nie tak - błąd serwera';
    if (statusCode === 200) {
      message = 'Na podany adres e-mail wysłano link aktywacyjny';
    } else if (statusCode === 409) {
      message = 'Podany adres e-mail jest już zajęty';
    }

    this.snackBar.open(message,
      '', {duration: this.snackbarDurationInSeconds * 1000, panelClass: ['snackbar']}
    );
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('validated sign-up submitted');
      this.authService.signUp(new SignUpRequest(this.email.value, this.password.value)).subscribe(
        httpResponse => {
          this.openSnackBar(httpResponse.status);

          if (httpResponse.ok) {
            this.signUpFormDirective.resetForm();
          }
        }, (error: HttpErrorResponse) => {
          this.openSnackBar(error.status);
        });
    }
  }
}
