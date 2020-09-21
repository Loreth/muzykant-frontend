import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Voivodeship} from '../../../shared/models/voivodeship';
import {UserType} from '../../../shared/models/user-type';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {debounceTime, map} from 'rxjs/operators';
import {GenreService} from '../../../core/services/genre.service';
import {InstrumentService} from '../../../core/services/instrument.service';
import {Genre} from '../../../shared/models/genre';
import {Instrument} from '../../../shared/models/instrument';

@Component({
  selector: 'app-user-search-filter-panel',
  templateUrl: './user-search-filter-panel.component.html',
  styleUrls: ['./user-search-filter-panel.component.css']
})
export class UserSearchFilterPanelComponent implements OnInit {
  sliderValues: { min: number, max: number };
  voivodeships$: Observable<Voivodeship[]>;
  genres$: Observable<Genre[]>;
  instruments$: Observable<Instrument[]>;
  @Input() wantedUserType: UserType;
  @Output() changedFilters = new EventEmitter<FormGroup>();
  nameLabel: string;
  sliderLabel: string;

  userFiltersForm = new FormGroup({
    voivodeships: new FormControl(),
    city: new FormControl(),
    name: new FormControl(),
    genderMale: new FormControl(false),
    genderFemale: new FormControl(false),
    ageRange: new FormControl({min: 0, max: 100}),
    genres: new FormControl(),
    instruments: new FormControl()
  });

  constructor(private voivodeshipService: VoivodeshipService,
              private genreService: GenreService,
              private instrumentService: InstrumentService) {
  }

  ngOnInit(): void {
    this.setLabels();
    this.sliderValues = {min: 0, max: 100};
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name'])
    .pipe(map(page => page.content));

    this.userFiltersForm.valueChanges.pipe(debounceTime(1000)).subscribe(_ => {
      this.changedFilters.emit(this.userFiltersForm);
      console.log('user search filters emitted');
    });
    this.genres$ = this.genreService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
    this.instruments$ = this.instrumentService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
  }

  setLabels(): void {
    if (this.wantedUserType === UserType.MUSICIAN) {
      this.nameLabel = 'Imie, nazwisko lub pseudonim';
      this.sliderLabel = 'Wiek';
    } else {
      this.nameLabel = 'Nazwa zespołu';
      this.sliderLabel = 'Rok założenia';
    }
  }
}
