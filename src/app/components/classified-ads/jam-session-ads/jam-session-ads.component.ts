import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../../../shared/models/pagination/page';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {FormGroup} from '@angular/forms';
import {JamSessionAdService} from '../../../core/services/jam-session-ad.service';
import {AdChip} from '../../../shared/models/ad-chip';
import {map} from 'rxjs/operators';
import {JamSessionAd} from '../../../shared/models/jam-session-ad';

@Component({
  selector: 'app-jam-session-ads',
  templateUrl: './jam-session-ads.component.html',
  styleUrls: ['./jam-session-ads.component.css']
})
export class JamSessionAdsComponent implements OnInit {
  adsWithChips$: Observable<AdWithChips[]>;

  constructor(private jamSessionAdService: JamSessionAdService) {
  }

  ngOnInit(): void {
    this.adsWithChips$ = this.jamSessionAdService
    .getDtosPage(0, 10, ['publishedDate,DESC'])
    .pipe(map(page => this.mapToAdsWithChips(page)));
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.adsWithChips$ = this.jamSessionAdService
    .searchDtosWithForm(filtersForm, 0, 10, ['publishedDate,DESC'])
    .pipe(map(page => this.mapToAdsWithChips(page)));
  }

  private mapToAdsWithChips(page: Page<JamSessionAd>): AdWithChips[] {
    const adsWithChips = [];
    for (const ad of page.content) {
      adsWithChips.push(new AdWithChips(ad, AdChip.makeAdChips(ad)));
    }
    return adsWithChips;
  }
}
