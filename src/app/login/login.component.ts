import {Component} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {TokenStorageService} from '../shared/services/token-storage.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../shared/models/login-request.model';
import {FIELD_REQUIRED_MSG} from '../shared/message-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true;
  failedToLogin = false;
  requiredMessage = FIELD_REQUIRED_MSG;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(new LoginRequest(this.email.value, this.password.value)).subscribe(
        loggedIn => {
          if (loggedIn) {
            this.router.navigateByUrl('');
          } else {
            this.failedToLogin = true;
          }
        }
      );
    }
  }
}
