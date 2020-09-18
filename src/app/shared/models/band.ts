import {User} from './user';

export interface Band extends User {
  name: string;
  formationYear: number;
}
