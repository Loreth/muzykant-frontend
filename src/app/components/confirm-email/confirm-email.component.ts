import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export const CONFIRMED_SUCCESSFULLY_MESSAGE = 'E-mail został zweryfikowany. Możesz się zalogować.';
export const AWAITING_CONFIRMATION_MESSAGE = 'E-mail oczekuje na weryfikację. \nPotwierdź go klikając link otrzymany w wiadomości.';
export const WRONG_LINK_MESSAGE = 'Link potwierdzający jest niepoprawny. \nKliknij lub skopiuj go ponownie z wiadomości otrzymanej na skrzynce pocztowej.';
export const TOKEN_EXPIRED_MESSAGE = 'Upłynął okres ważności linku potwierdzającego. Zarejestruj się ponownie.';
export const TOKEN_NOT_FOUND_MESSAGE = 'Token potwierdzający zawarty w linku nie istnieje. \nMógł on zostać usunięty, jeśli upłynął okres ważności linku. Zarejestruj się ponownie.';

export const RESENT_SUCCESSFULLY_MESSAGE = 'Link aktywacyjny został wysłany ponownie. Sprawdź swoją skrzynkę pocztową.';
export const RESENT_FAILED_MESSAGE = 'Konto pod tym adresem e-mail nie istnieje lub zostało już aktywowane';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  confirmationToken;
  message;
  confirmedSuccessfully;

  email;
  awaitingConfirmation;
  mailResent;
  resentSuccessfully;
  resentMessage;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.confirmationToken = params.token;
      this.email = params.email;
      if (params.email) {
        this.awaitingConfirmation = true;
        this.message = AWAITING_CONFIRMATION_MESSAGE;
        return;
      } else if (!this.confirmationToken) {
        this.message = WRONG_LINK_MESSAGE;
        return;
      }

      this.authService.confirmEmail(this.confirmationToken).subscribe(
        response => {
          this.confirmedSuccessfully = response.ok;
          this.message = CONFIRMED_SUCCESSFULLY_MESSAGE;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.confirmedSuccessfully = false;
          if (error.status === 422) {
            this.message = WRONG_LINK_MESSAGE;
          } else if (error.status === 409) {
            if (error.error.trace.includes('EmailConfirmationTokenExpiredException')) {
              this.message = TOKEN_EXPIRED_MESSAGE;
            } else if (error.error.trace.includes('EmailConfirmationTokenNotFound')) {
              this.message = TOKEN_NOT_FOUND_MESSAGE;
            }
          }
        }
      );
    });
  }

  resendEmail(): void {
    this.authService.resendEmail(this.email).subscribe(
      response => {
        this.resentSuccessfully = response.ok;
        this.resentMessage = RESENT_SUCCESSFULLY_MESSAGE;
        this.mailResent = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.resentSuccessfully = false;
        this.resentMessage = RESENT_FAILED_MESSAGE;
        this.mailResent = true;
      }
    );
  }
}
