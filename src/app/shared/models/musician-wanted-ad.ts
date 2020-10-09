import {Ad} from './ad';

export interface MusicianWantedAd extends Ad {
  preferredGender: string;
  minAge: number;
  maxAge: number;
}
