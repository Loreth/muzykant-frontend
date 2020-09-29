import {Component, OnInit} from '@angular/core';
import {MusicianService} from '../../../core/services/musician.service';
import {Observable} from 'rxjs';
import {Musician} from '../../../shared/models/musician';
import {map, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {UserType} from '../../../shared/models/user-type';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-musicians',
  templateUrl: './musicians.component.html',
  styleUrls: ['./musicians.component.css']
})
export class MusiciansComponent implements OnInit {
  musicians$: Observable<Musician[]>;
  wantedUserType = UserType.MUSICIAN;
  musiciansLength: number;
  pageSize = 20;
  page = 0;
  lastFilters: FormGroup;

  constructor(private musicianService: MusicianService) {
  }

  ngOnInit(): void {
    this.fetchMusiciansPage();
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.musicians$ = this.musicianService.searchDtosWithForm(filtersForm, this.page, this.pageSize)
    .pipe(map(page => page.content));
    this.lastFilters = filtersForm;
  }

  fetchMusiciansPage(): void {
    this.musicians$ = this.musicianService.getDtosPage(this.page, this.pageSize).pipe(
      tap(page => this.musiciansLength = page.totalElements),
      map(page => page.content)
    );
  }

  onPageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    if (!this.lastFilters) {
      this.fetchMusiciansPage();
    } else {
      this.onChangedFilters(this.lastFilters);
    }
  }
}
