import {User} from './user';
import {Person} from './person';

export interface Musician extends User {
  person: Person;
}
