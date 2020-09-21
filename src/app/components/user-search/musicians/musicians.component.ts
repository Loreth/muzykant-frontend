import {Component, OnInit} from '@angular/core';
import {MusicianService} from '../../../core/services/musician.service';
import {Observable} from 'rxjs';
import {Musician} from '../../../shared/models/musician';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {UserType} from '../../../shared/models/user-type';

@Component({
  selector: 'app-musicians',
  templateUrl: './musicians.component.html',
  styleUrls: ['./musicians.component.css']
})
export class MusiciansComponent implements OnInit {
  musicians$: Observable<Musician[]>;
  wantedUserType = UserType.MUSICIAN;

  constructor(private musicianService: MusicianService) {
  }

  ngOnInit(): void {
    this.musicians$ = this.musicianService.getDtosPage().pipe(map(page => page.content));
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.musicians$ = this.musicianService.searchDtosWithForm(filtersForm, 0, 15)
    .pipe(map(page => page.content));
  }
}
