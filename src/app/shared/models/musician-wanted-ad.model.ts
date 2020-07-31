import {Ad} from './ad.model';
import {VocalRange} from './vocal-range.model';

export interface MusicianWantedAd extends Ad {
  preferredGender: string;
  minAge: number;
  maxAge: number;
  vocalRange: VocalRange;
}
