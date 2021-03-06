import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CHANGE_PASSWORD, CONFIRM_EMAIL, getEndpointUrl, LOGIN, RESEND_MAIL, SIGN_UP, USER} from '../../shared/rest-api-urls';
import {LoginRequest} from '../../shared/models/login-request';
import {SignUpRequest} from '../../shared/models/sign-up-request';
import {TokenStorageService} from './token-storage.service';
import {map, tap} from 'rxjs/operators';
import {TokenClaims} from '../../shared/models/token-claims';
import {Router} from '@angular/router';
import {Authority} from '../../shared/models/authority';
import {PasswordChangeRequest} from '../../shared/models/password-change-request';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {rxStompConfig} from '../../config/rx-stomp.config';
import {ChatMessageService} from './chat-message.service';

const DISPLAY_NAME_KEY = 'display-name';
const PROFILE_IMAGE_LINK_KEY = 'profile-image-link';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private rxStompService: RxStompService,
              private chatMessageService: ChatMessageService) {
  }

  login(loginRequest: LoginRequest): Observable<TokenClaims> {
    return this.http.post(getEndpointUrl(LOGIN), loginRequest).pipe(
      map((response: any) => this.tokenStorageService.saveTokenAndClaims(response.token)),
      tap(() => {
        const config: InjectableRxStompConfig = {
          ...rxStompConfig,
          connectHeaders: {Authorization: `Bearer ${TokenStorageService.getToken()}`}
        };
        this.rxStompService.configure(config);
        this.rxStompService.activate();
        this.chatMessageService.initialize(AuthService.loggedUserId);
        this.chatMessageService.getChatQueue().subscribe();
      })
    );
  }

  logout(): void {
    console.log('logging out');
    this.rxStompService.deactivate();
    TokenStorageService.logout();
    localStorage.removeItem(DISPLAY_NAME_KEY);
    localStorage.removeItem(PROFILE_IMAGE_LINK_KEY);
    this.router.navigateByUrl('');
  }

  signUp(signUpRequest: SignUpRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(getEndpointUrl(SIGN_UP), signUpRequest, {observe: 'response'}).pipe(
      tap(() => console.log(`Attempted to sign up ${signUpRequest.email}`))
    );
  }

  confirmEmail(token: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(getEndpointUrl(CONFIRM_EMAIL), {token}, {observe: 'response'}).pipe(
      tap(() => console.log(`Attempted to confirm email with token ${token}`))
    );
  }

  resendEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(getEndpointUrl(RESEND_MAIL), {email}, {observe: 'response'});
  }

  changePassword(passwordChangeRequest: PasswordChangeRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      getEndpointUrl(USER + '/' + AuthService.loggedUserId + CHANGE_PASSWORD),
      passwordChangeRequest, {observe: 'response'});
  }

  isLoggedIn(): boolean {
    return TokenStorageService.getToken() != null;
  }

  isFullyRegistered(): boolean {
    return AuthService.loggedUserId != null && AuthService.loggedUserAuthority != null;
  }

  static get loggedUserId(): number {
    return TokenStorageService.getClaims()?.userId;
  }

  static get loggedUserAuthority(): Authority {
    return TokenStorageService.getClaims()?.authority;
  }

  static get loggedUserEmail(): string {
    return TokenStorageService.getClaims()?.subject;
  }

  static get loggedUserLinkName(): string {
    return TokenStorageService.getClaims()?.linkName;
  }

  static get userDisplayName(): string {
    return localStorage.getItem(DISPLAY_NAME_KEY);
  }

  static set userDisplayName(userDisplayName: string) {
    localStorage.setItem(DISPLAY_NAME_KEY, userDisplayName);
  }

  static get userProfileImageLink(): string {
    return localStorage.getItem(PROFILE_IMAGE_LINK_KEY);
  }

  static set userProfileImageLink(userProfileImageLink: string) {
    localStorage.setItem(PROFILE_IMAGE_LINK_KEY, userProfileImageLink);
  }
}
