import {User} from './user';
import {Person} from './person';
import {Equipment} from './equipment';

export interface Musician extends User {
  person: Person;
  equipment: Equipment[];
}
