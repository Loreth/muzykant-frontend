import {UserType} from './UserType';
import {Identifiable} from './identifiable.model';
import {Voivodeship} from './voivodeship.model';
import {Instrument} from './instrument.model';
import {Genre} from './genre.model';
import {UserImage} from './user-image';
import {VocalTechnique} from './vocal-technique.model';

export interface User extends Identifiable<number> {
  userType: UserType;
  linkName: string;
  description: string;
  phone: string;
  city: string;
  voivodeship: Voivodeship;
  profileImageLink: string;
  userImages: UserImage[];
  genres: Genre[];
  instruments: Instrument[];
  vocalTechniques: VocalTechnique[];
}
