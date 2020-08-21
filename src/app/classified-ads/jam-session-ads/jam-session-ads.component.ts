import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {AdWithChips} from '../ad-with-chips';
import {SomeoneWantedAdsComponent} from '../someone-wanted-ads/someone-wanted-ads.component';
import {FormGroup} from '@angular/forms';
import {JamSessionAd} from '../../shared/models/jam-session-ad.model';
import {JamSessionAdService} from '../../shared/services/jam-session-ad.service';

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
        adsWithChips.push(new AdWithChips(ad, SomeoneWantedAdsComponent.makeAdChips(ad)));
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
