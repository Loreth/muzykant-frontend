import {Component, Input} from '@angular/core';
import {AdWithChips} from '../ad-with-chips';
import {Genre} from '../../shared/models/genre.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-someone-wanted-ads',
  templateUrl: './someone-wanted-ads.component.html',
  styleUrls: ['./someone-wanted-ads.component.css']
})
export class SomeoneWantedAdsComponent {
  @Input() adsWithChips$: Subject<AdWithChips[]>;

  getProfileImageLink(): string {
    return null;
  }

  localizeUserType(userType: string): string {
    let localizedUserType: string;
    switch (userType) {
      case 'MUSICIAN':
        localizedUserType = 'Muzyk';
        break;
      case 'BAND':
        localizedUserType = 'Zespół';
        break;
      case 'REGULAR':
        localizedUserType = 'Zwykły';
        break;
    }

    return localizedUserType;
  }

  mapGenresToGenreNames(genres: Genre[]): string[] {
    return genres.map(genre => genre.name);
  }
}
