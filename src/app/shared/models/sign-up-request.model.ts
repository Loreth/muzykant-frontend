import {User} from './user';

export interface SignUpRequest<T extends User> {
  username: string;
  password: string;
  user: T;
}
