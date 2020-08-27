import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {getEndpointUrl, LOGIN, SIGN_UP} from '../rest-api-urls';
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

  signUp(signUpRequest: SignUpRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(getEndpointUrl(SIGN_UP), signUpRequest, {observe: 'response'}).pipe(
      tap(() => console.log(`Attempted to sign up ${signUpRequest.email}`))
    );
  }

  isLoggedIn(): boolean {
    return TokenStorageService.getToken() != null;
  }
}
