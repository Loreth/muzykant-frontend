import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenClaims} from '../../shared/models/token-claims';

const TOKEN_KEY = 'jwt';
const CLAIMS_KEY = 'jwt-claims';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private jwtHelperService: JwtHelperService) {
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  static logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CLAIMS_KEY);
  }

  static getClaims(): TokenClaims {
    return JSON.parse(localStorage.getItem(CLAIMS_KEY));
  }

  private static saveClaims(decodedToken): TokenClaims {
    const claims = new TokenClaims(
      decodedToken.sub,
      decodedToken.authority,
      decodedToken.userId,
      decodedToken.linkName);
    localStorage.setItem(CLAIMS_KEY, JSON.stringify(claims));

    return claims;
  }

  static setClaims(tokenClaims: TokenClaims): void {
    localStorage.setItem(CLAIMS_KEY, JSON.stringify(tokenClaims));
  }

  saveTokenAndClaims(token: string): TokenClaims {
    localStorage.setItem(TOKEN_KEY, token);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    return TokenStorageService.saveClaims(decodedToken);
  }
}
