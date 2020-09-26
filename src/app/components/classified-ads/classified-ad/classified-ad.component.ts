import {Component, Input} from '@angular/core';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {AdType} from '../../../shared/models/ad-type';
import {Genre} from '../../../shared/models/genre';
import {UserType} from '../../../shared/models/user-type';
import {LocalizationUtils} from '../../../shared/localization-utils';
import {AdChip} from '../../../shared/models/ad-chip';

@Component({
  selector: 'app-classified-ad',
  templateUrl: './classified-ad.component.html',
  styleUrls: ['./classified-ad.component.css']
})
export class ClassifiedAdComponent {
  @Input() adWithChips: AdWithChips;

  sortAndJoinGenresToGenreNames(genres: Genre[]): string {
    const namesCount = 4;
    genres.sort((a, b) => a.name.localeCompare(b.name));
    let joinedNames = genres.slice(0, namesCount).map(genre => genre.name).join(', ');
    if (genres.length > namesCount) {
      joinedNames += `, +${genres.length - namesCount} więcej`;
    }

    return joinedNames;
  }

  localizeUserType(userType: UserType): string {
    return LocalizationUtils.localizeUserType(userType);
  }

  getFallbackIconName(userType: UserType): string {
    return userType === UserType.BAND ? 'supervised_user_circle' : 'account_circle';
  }

  sortChips(chips: AdChip[]): AdChip[] {
    chips.sort((a, b) => {
      if (a.cssClass === b.cssClass) {
        return a.label.localeCompare(b.label);
      } else if (a.getSortOrder() < b.getSortOrder()) {
        return -1;
      } else {
        return 1;
      }
    });

    return chips;
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
}
