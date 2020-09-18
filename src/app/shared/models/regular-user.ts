import {User} from './user';
import {Person} from './person';

export interface RegularUser extends User {
  person: Person;
}
