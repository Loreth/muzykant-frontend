import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenClaims} from '../models/token-claims';

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

  static signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CLAIMS_KEY);
  }

  static getClaims(): TokenClaims {
    return JSON.parse(localStorage.getItem(CLAIMS_KEY));
  }

  private static saveClaims(decodedToken): void {
    localStorage.setItem(CLAIMS_KEY,
      JSON.stringify(
        new TokenClaims(
          decodedToken.sub,
          decodedToken.authority,
          decodedToken.userId,
          decodedToken.linkName)));
  }

  saveTokenAndClaims(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    TokenStorageService.saveClaims(decodedToken);
  }
}
