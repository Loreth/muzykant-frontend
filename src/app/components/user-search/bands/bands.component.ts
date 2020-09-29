import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserType} from '../../../shared/models/user-type';
import {map, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {Band} from '../../../shared/models/band';
import {BandService} from '../../../core/services/band.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {
  bands$: Observable<Band[]>;
  wantedUserType = UserType.BAND;
  bandsLength: number;
  pageSize = 20;
  page = 0;
  lastFilters: FormGroup;

  constructor(private bandService: BandService) {
  }

  ngOnInit(): void {
    this.fetchBandsPage();
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.bands$ = this.bandService.searchDtosWithForm(filtersForm, this.page, this.pageSize)
    .pipe(map(page => page.content));
    this.lastFilters = filtersForm;
  }

  fetchBandsPage(): void {
    this.bands$ = this.bandService.getDtosPage(this.page, this.pageSize).pipe(
      tap(page => this.bandsLength = page.totalElements),
      map(page => page.content)
    );
  }

  onPageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    if (!this.lastFilters) {
      this.fetchBandsPage();
    } else {
      this.onChangedFilters(this.lastFilters);
    }
  }
}
