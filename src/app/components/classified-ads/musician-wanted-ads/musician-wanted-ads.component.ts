import {Component, OnInit} from '@angular/core';
import {MusicianWantedAdService} from '../../../core/services/musician-wanted-ad.service';
import {AdChip} from '../../../shared/models/ad-chip';
import {MusicianWantedAd} from '../../../shared/models/musician-wanted-ad';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {Page} from '../../../shared/models/pagination/page';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {UserType} from '../../../shared/models/user-type';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-musician-wanted-ads',
  templateUrl: './musician-wanted-ads.component.html',
  styleUrls: ['./musician-wanted-ads.component.css']
})
export class MusicianWantedAdsComponent implements OnInit {

  constructor(private musicianWantedAdService: MusicianWantedAdService) {
  }

  adsWithChips$: Observable<AdWithChips[]>;
  wantedUserType = UserType.MUSICIAN;

  ngOnInit(): void {
    this.adsWithChips$ = this.musicianWantedAdService
    .getDtosPage(0, 10, ['publishedDate,DESC'])
    .pipe(map(page => this.mapToAdsWithChips(page)));
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.adsWithChips$ = this.musicianWantedAdService
    .searchDtosWithForm(filtersForm, 0, 10, ['publishedDate,DESC'])
    .pipe(map(page => this.mapToAdsWithChips(page)));
  }

  private mapToAdsWithChips(page: Page<MusicianWantedAd>): AdWithChips[] {
    const adsWithChips = [];
    for (const ad of page.content) {
      adsWithChips.push(new AdWithChips(ad, AdChip.makeMusicianWantedAdChips(ad)));
    }
    return adsWithChips;
  }
}
