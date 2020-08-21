import {User} from './user';
import {Person} from './person';
import {VocalRange} from './vocal-range.model';
import {Equipment} from './equipment.model';

export interface Musician extends User {
  person: Person;
  vocalRange: VocalRange;
  equipment: Equipment[];
}
