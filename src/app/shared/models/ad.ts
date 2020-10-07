import {Genre} from './genre';
import {Instrument} from './instrument';
import {Identifiable} from './identifiable';
import {Voivodeship} from './voivodeship';
import {AdType} from './ad-type';
import {UserType} from './user-type';

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
  userLinkName: string;
}
