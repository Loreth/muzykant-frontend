import {Authority} from './authority';

export class TokenClaims {
  subject: string;
  authority: Authority;
  userId: number;
  linkName: string;

  constructor(subject: string, authority: Authority, userId: number, linkName: string) {
    this.subject = subject;
    this.authority = authority;
    this.userId = userId;
    this.linkName = linkName;
  }
}
