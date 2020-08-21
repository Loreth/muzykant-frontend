import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {AdWithChips} from '../ad-with-chips';
import {SomeoneWantedAdsComponent} from '../someone-wanted-ads/someone-wanted-ads.component';
import {FormGroup} from '@angular/forms';
import {BandWantedAd} from '../../shared/models/band-wanted-ad.model';
import {BandWantedAdService} from '../../shared/services/band-wanted-ad.service';
import {UserType} from '../../shared/models/UserType';

@Component({
  selector: 'app-band-wanted-ads',
  templateUrl: './band-wanted-ads.component.html',
  styleUrls: ['./band-wanted-ads.component.css']
})
export class BandWantedAdsComponent implements OnInit {
  adsPage$: Subject<Page<BandWantedAd>> = new Subject();
  adsWithChips$: Subject<AdWithChips[]> = new Subject();
  wantedUserType = UserType.BAND;

  constructor(private bandWantedAdService: BandWantedAdService) {
  }

  ngOnInit(): void {
    this.bandWantedAdService
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
    this.bandWantedAdService
    .searchDtosWithForm(filtersForm, 0, 10, ['publishedDate,DESC'])
    .subscribe(page => this.adsPage$.next(page));
  }
}
