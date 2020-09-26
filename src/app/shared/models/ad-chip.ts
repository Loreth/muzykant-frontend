import {Ad} from './ad';
import {MusicianWantedAd} from './musician-wanted-ad';
import {AdType} from './ad-type';

export enum ChipCssClass {
  INSTRUMENT = 'instrument-chip',
  GENRE = 'genre-chip',
  GENDER = 'gender-chip',
  AGE = 'age-chip'
}

export class AdChip {
  constructor(label: string, cssClass: ChipCssClass) {
    this.label = label;
    this.cssClass = cssClass;
  }

  label: string;
  cssClass: ChipCssClass;

  static makeAdChips(ad: Ad): AdChip[] {
    const adChips: AdChip[] = [];

    if (ad.preferredGenres) {
      for (const genre of ad.preferredGenres) {
        adChips.push(new AdChip(genre.name, ChipCssClass.GENRE));
      }
    }
    if (ad.preferredInstruments) {
      for (const instrument of ad.preferredInstruments) {
        adChips.push(new AdChip(instrument.name, ChipCssClass.INSTRUMENT));
      }
    }
    if (ad.adType === AdType.MUSICIAN_WANTED) {
      adChips.push(...AdChip.makePersonalAdChips(ad as MusicianWantedAd));
    }
    return adChips;
  }

  private static makePersonalAdChips(ad: MusicianWantedAd): AdChip[] {
    const adChips: AdChip[] = [];

    if (ad.preferredGender === 'F') {
      adChips.push(new AdChip('Kobieta', ChipCssClass.GENDER));
    } else if (ad.preferredGender === 'M') {
      adChips.push(new AdChip('Mężczyzna', ChipCssClass.GENDER));
    }
    if (ad.minAge && ad.maxAge) {
      adChips.push(new AdChip(`${ad.minAge.toString()}-${ad.maxAge.toString()} lat`, ChipCssClass.AGE));
    }

    return adChips;
  }

  getSortOrder(): number {
    switch (this.cssClass) {
      case ChipCssClass.GENRE:
        return 0;
      case ChipCssClass.INSTRUMENT:
        return 1;
      case ChipCssClass.GENDER:
        return 2;
      case ChipCssClass.AGE:
        return 3;
    }
  }
}

