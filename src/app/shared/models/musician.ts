import {User} from './user';
import {Person} from './person';
import {VocalRange} from './vocal-range';
import {Equipment} from './equipment';

export interface Musician extends User {
  person: Person;
  vocalRange: VocalRange;
  equipment: Equipment[];
}
