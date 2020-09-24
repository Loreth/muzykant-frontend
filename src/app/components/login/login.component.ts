import {Component} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../../shared/models/login-request';
import {FIELD_REQUIRED_MSG} from '../../shared/message-constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true;
  requiredMessage = FIELD_REQUIRED_MSG;
  snackbarDurationInSeconds = 4;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    if (authService.isLoggedIn()) {
      router.navigateByUrl('');
    }
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  openSnackBar(error: HttpErrorResponse): void {
    let message = 'Coś poszło nie tak - błąd serwera';
    if (error.status === 401) {
      message = 'Podano błędny e-mail lub hasło';
    }

    this.snackBar.open(message,
      '', {duration: this.snackbarDurationInSeconds * 1000, panelClass: ['snackbar']}
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(new LoginRequest(this.email.value, this.password.value)).subscribe(
        claims => {
          if (claims) {
            if (claims.userId) {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              this.router.navigateByUrl('/create-user');
            }
          }
        }, (error: HttpErrorResponse) => {
          if (error.error?.message.includes('User is disabled')) {
            console.log('redirecting for disabled user ' + this.email.value);
            this.router.navigate(['/confirm-email'], {queryParams: {email: this.email.value}});
          } else {
            this.openSnackBar(error);
          }
        }
      );
    }
  }
}
