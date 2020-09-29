import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {map, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AdType} from '../../../shared/models/ad-type';
import {AdServiceFactoryService} from '../../../core/services/ad-service-factory.service';
import {Ad} from '../../../shared/models/ad';
import {RestSearchService} from '../../../core/services/rest-search.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-ads-with-filter-panel',
  templateUrl: './ads-with-filter-panel.component.html',
  styleUrls: ['./ads-with-filter-panel.component.css']
})
export class AdsWithFilterPanelComponent implements OnInit {
  adsWithChips$: Observable<AdWithChips[]>;
  adService: RestSearchService<Ad, number>;
  adType: AdType;
  adsLength: number;
  pageSize = 20;
  page = 0;
  lastFilters: FormGroup;

  constructor(private adServiceFactoryService: AdServiceFactoryService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
        this.adType = data.adType;
        this.adService = this.adServiceFactoryService.getAdService(data.adType);
        this.fetchUserPage();
      }
    );
  }

  fetchUserPage(): void {
    this.adsWithChips$ = this.adService
    .getDtosPage(this.page, this.pageSize, ['publishedDate,DESC'])
    .pipe(
      tap(page => this.adsLength = page.totalElements),
      map(page => AdWithChips.mapToAdsWithChips(page.content))
    );
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.adsWithChips$ = this.adService
    .searchDtosWithForm(filtersForm, this.page, this.pageSize, ['publishedDate,DESC'])
    .pipe(
      tap(page => this.adsLength = page.totalElements),
      map(page => AdWithChips.mapToAdsWithChips(page.content))
    );
    this.lastFilters = filtersForm;
  }

  onPageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    if (!this.lastFilters) {
      this.fetchUserPage();
    } else {
      this.onChangedFilters(this.lastFilters);
    }
  }
}
