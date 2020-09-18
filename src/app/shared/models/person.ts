import {Identifiable} from './identifiable';
import {Moment} from 'moment';

export interface Person extends Identifiable<number> {
  firstName: string;
  lastName: string;
  pseudo: string;
  gender: string;
  birthdate: Moment;
}
