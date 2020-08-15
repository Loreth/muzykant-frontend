import {Genre} from './genre.model';
import {Instrument} from './instrument.model';
import {Identifiable} from './identifiable.model';
import {UserType} from './UserType';

export interface Ad extends Identifiable<number> {
  publishedDate: string;
  location: string;
  description: string;
  commercial: boolean;
  preferredGenres: Genre[];
  preferredInstruments: Instrument[];
  userId: number;
  userType: string;
  userDisplayName: string;
  userGenres: Genre[];
}
