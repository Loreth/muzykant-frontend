export class TokenClaims {
  subject: string;
  authority: string;
  userId: number;
  linkName: string;

  constructor(subject: string, authority: string, userId: number, linkName: string) {
    this.subject = subject;
    this.authority = authority;
    this.userId = userId;
    this.linkName = linkName;
  }
}
