import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Page} from '../../../shared/models/pagination/page';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {FormGroup} from '@angular/forms';
import {JamSessionAd} from '../../../shared/models/jam-session-ad';
import {JamSessionAdService} from '../../../core/services/jam-session-ad.service';
import {AdChip} from '../../../shared/models/ad-chip';

@Component({
  selector: 'app-jam-session-ads',
  templateUrl: './jam-session-ads.component.html',
  styleUrls: ['./jam-session-ads.component.css']
})
export class JamSessionAdsComponent implements OnInit {
  adsPage$: Subject<Page<JamSessionAd>> = new Subject();
  adsWithChips$: Subject<AdWithChips[]> = new Subject();

  constructor(private jamSessionAdService: JamSessionAdService) {
  }

  ngOnInit(): void {
    this.jamSessionAdService
    .getDtosPage(0, 10, ['publishedDate,DESC'])
    .subscribe(page => this.adsPage$.next(page));

    this.adsPage$.subscribe(page => {
      const adsWithChips = [];
      for (const ad of page.content) {
        adsWithChips.push(new AdWithChips(ad, AdChip.makeAdChips(ad)));
      }
      this.adsWithChips$.next(adsWithChips);
    });
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.jamSessionAdService
    .searchDtosWithForm(filtersForm, 0, 10, ['publishedDate,DESC'])
    .subscribe(page => this.adsPage$.next(page));
  }
}
