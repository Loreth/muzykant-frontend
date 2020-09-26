import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {AdChip} from '../../../shared/models/ad-chip';
import {ActivatedRoute} from '@angular/router';
import {AdType} from '../../../shared/models/ad-type';
import {AdServiceFactoryService} from '../../../core/services/ad-service-factory.service';
import {Ad} from '../../../shared/models/ad';
import {RestSearchService} from '../../../core/services/rest-search.service';

@Component({
  selector: 'app-ads-with-filter-panel',
  templateUrl: './ads-with-filter-panel.component.html',
  styleUrls: ['./ads-with-filter-panel.component.css']
})
export class AdsWithFilterPanelComponent implements OnInit {
  adsWithChips$: Observable<AdWithChips[]>;
  adService: RestSearchService<Ad, number>;
  adType: AdType;

  constructor(private adServiceFactoryService: AdServiceFactoryService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
        this.adType = data.adType;
        this.adService = this.adServiceFactoryService.getAdService(data.adType);
        this.adsWithChips$ = this.adService
        .getDtosPage(0, 10, ['publishedDate,DESC'])
        .pipe(map(page => this.mapToAdsWithChips(page.content)));
      }
    );
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.adsWithChips$ = this.adService
    .searchDtosWithForm(filtersForm, 0, 10, ['publishedDate,DESC'])
    .pipe(map(page => this.mapToAdsWithChips(page.content)));
  }

  private mapToAdsWithChips(ads: Ad[]): AdWithChips[] {
    const adsWithChips = [];
    for (const ad of ads) {
      adsWithChips.push(new AdWithChips(ad, AdChip.makeAdChips(ad)));
    }
    return adsWithChips;
  }
}
