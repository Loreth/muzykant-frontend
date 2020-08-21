import {Identifiable} from './identifiable.model';

export interface Person extends Identifiable<number> {
  firstName: string;
  lastName: string;
  pseudo: string;
  gender: string;
  birthdate: Date;
}
