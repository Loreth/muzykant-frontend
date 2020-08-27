import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {getEndpointUrl, LOGIN} from '../rest-api-urls';
import {LoginRequest} from '../models/login-request.model';
import {SignUpRequest} from '../models/sign-up-request.model';
import {TokenStorageService} from './token-storage.service';
import {catchError, mapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post(getEndpointUrl(LOGIN), loginRequest).pipe(
      tap((response: any) => this.tokenStorageService.saveTokenAndClaims(response.token)),
      mapTo(true),
      catchError(() => {
        console.error('failed to login');
        return of(false);
      })
    );
  }

  logout(): void {
    TokenStorageService.signOut();
  }

  signUp(signUpRequest: SignUpRequest<any>, endpointUrl: string): Observable<any> {
    return this.http.post(endpointUrl, signUpRequest);
  }

  isLoggedIn(): boolean {
    return TokenStorageService.getToken() != null;
  }
}
