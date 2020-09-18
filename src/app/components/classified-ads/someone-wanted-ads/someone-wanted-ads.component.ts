import {Component, Input} from '@angular/core';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {Genre} from '../../../shared/models/genre';
import {Subject} from 'rxjs';
import {UserType} from '../../../shared/models/user-type';
import {AdType} from '../../../shared/models/ad-type';
import {LocalizationUtils} from '../../../shared/localization-utils';

@Component({
  selector: 'app-someone-wanted-ads',
  templateUrl: './someone-wanted-ads.component.html',
  styleUrls: ['./someone-wanted-ads.component.css']
})
export class SomeoneWantedAdsComponent {
  @Input() adsWithChips$: Subject<AdWithChips[]>;

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
