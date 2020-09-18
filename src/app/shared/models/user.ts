import {UserType} from './user-type';
import {Identifiable} from './identifiable';
import {Voivodeship} from './voivodeship';
import {Instrument} from './instrument';
import {Genre} from './genre';
import {UserImage} from './user-image';
import {VocalTechnique} from './vocal-technique';

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
