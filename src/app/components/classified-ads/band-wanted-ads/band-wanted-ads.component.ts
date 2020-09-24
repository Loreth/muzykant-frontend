import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../../../shared/models/pagination/page';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {FormGroup} from '@angular/forms';
import {BandWantedAd} from '../../../shared/models/band-wanted-ad';
import {BandWantedAdService} from '../../../core/services/band-wanted-ad.service';
import {UserType} from '../../../shared/models/user-type';
import {AdChip} from '../../../shared/models/ad-chip';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-band-wanted-ads',
  templateUrl: './band-wanted-ads.component.html',
  styleUrls: ['./band-wanted-ads.component.css']
})
export class BandWantedAdsComponent implements OnInit {
  adsWithChips$: Observable<AdWithChips[]>;
  wantedUserType = UserType.BAND;

  constructor(private bandWantedAdService: BandWantedAdService) {
  }

  ngOnInit(): void {
    this.adsWithChips$ = this.bandWantedAdService
    .getDtosPage(0, 10, ['publishedDate,DESC'])
    .pipe(map(page => this.mapToAdsWithChips(page)));
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.adsWithChips$ = this.bandWantedAdService
    .searchDtosWithForm(filtersForm, 0, 10, ['publishedDate,DESC'])
    .pipe(map(page => this.mapToAdsWithChips(page)));
  }

  private mapToAdsWithChips(page: Page<BandWantedAd>): AdWithChips[] {
    const adsWithChips = [];
    for (const ad of page.content) {
      adsWithChips.push(new AdWithChips(ad, AdChip.makeAdChips(ad)));
    }
    return adsWithChips;
  }
}
