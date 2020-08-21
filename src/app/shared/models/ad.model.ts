import {Genre} from './genre.model';
import {Instrument} from './instrument.model';
import {Identifiable} from './identifiable.model';
import {Voivodeship} from './voivodeship.model';
import {AdType} from './AdType';
import {UserType} from './UserType';

export interface Ad extends Identifiable<number> {
  adType: AdType;
  publishedDate: string;
  voivodeships: Voivodeship[];
  location: string;
  description: string;
  commercial: boolean;
  preferredGenres: Genre[];
  preferredInstruments: Instrument[];
  userId: number;
  userType: UserType;
  userDisplayName: string;
  userGenres: Genre[];
  userProfileImageLink: string;
}
