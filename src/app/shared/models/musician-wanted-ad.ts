import {Ad} from './ad';
import {VocalRange} from './vocal-range';

export interface MusicianWantedAd extends Ad {
  preferredGender: string;
  minAge: number;
  maxAge: number;
  vocalRange: VocalRange;
}
