import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {FIELD_REQUIRED_MSG} from '../../../shared/message-constants';
import {AuthService} from '../../../core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomValidators} from '../../../core/validators/custom-validators';
import {PasswordChangeRequest} from '../../../shared/models/password-change-request';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  hidePassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;
  requiredMessage = FIELD_REQUIRED_MSG;
  emailForm = new FormControl();
  passwordChangeForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {validators: CustomValidators.matchingValidator('confirmNewPassword', 'newPassword')});
  snackbarDurationInSeconds = 3.2;
  @ViewChild(FormGroupDirective) passwordChangeFormDirective: FormGroupDirective;

  get oldPassword(): AbstractControl {
    return this.passwordChangeForm.get('oldPassword');
  }

  get newPassword(): AbstractControl {
    return this.passwordChangeForm.get('newPassword');
  }

  get confirmNewPassword(): AbstractControl {
    return this.passwordChangeForm.get('confirmNewPassword');
  }

  constructor(private snackBar: MatSnackBar, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.emailForm.setValue(AuthService.loggedUserEmail);
  }

  onSubmitPasswordChangeForm(): void {
    if (this.passwordChangeForm.valid) {
      console.log('validated passwordChangeForm submitted');

      const passwordChangeRequest =
        new PasswordChangeRequest(this.oldPassword.value, this.newPassword.value);
      this.authService.changePassword(passwordChangeRequest).subscribe(response => {
        if (response.status === 200) {
          this.openSnackBar('Hasło zostało zmienione');
          this.passwordChangeFormDirective.resetForm();
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.openSnackBar('Podane stare hasło jest błędne');
        } else {
          this.openSnackBar('Coś poszło nie tak');
        }
      });
    }
  }

  openSnackBar(message = 'Coś poszło nie tak - błąd serwera'): void {
    this.snackBar.open(message,
      '', {duration: this.snackbarDurationInSeconds * 1000, panelClass: ['snackbar']}
    );
  }
}
