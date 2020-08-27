import {User} from './user';

export interface VerifiedEmailSignUpRequest<T extends User> {
  username: string;
  user: T;
}
