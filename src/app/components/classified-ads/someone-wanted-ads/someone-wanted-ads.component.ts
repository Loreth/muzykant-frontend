import {Component, Input} from '@angular/core';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {Genre} from '../../../shared/models/genre.model';
import {Subject} from 'rxjs';
import {AdChip, ChipCssClass} from '../../../shared/models/ad-chip';
import {Ad} from '../../../shared/models/ad.model';
import {UserType} from '../../../shared/models/UserType';
import {AdType} from '../../../shared/models/AdType';
import {LocalizationUtils} from '../../../shared/localization-utils';

@Component({
  selector: 'app-someone-wanted-ads',
  templateUrl: './someone-wanted-ads.component.html',
  styleUrls: ['./someone-wanted-ads.component.css']
})
export class SomeoneWantedAdsComponent {
  @Input() adsWithChips$: Subject<AdWithChips[]>;

  public static makeAdChips(ad: Ad): AdChip[] {
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

    return adChips;
  }

  mapGenresToGenreNames(genres: Genre[]): string[] {
    return genres.map(genre => genre.name);
  }

  mapAdTypeToRoutingPath(adType: AdType): string {
    switch (adType) {
      case AdType.MUSICIAN_WANTED:
        return '/ads/musician-wanted/';
      case AdType.BAND_WANTED:
        return '/ads/band-wanted';
      case AdType.JAM_SESSION:
        return '/ads/jam-session';
    }
  }

  localizeUserType(userType: UserType): string {
    return LocalizationUtils.localizeUserType(userType);
  }
}
