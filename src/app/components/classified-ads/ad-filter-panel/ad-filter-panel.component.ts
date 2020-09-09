import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Voivodeship} from '../../../shared/models/voivodeship.model';
import {FormControl, FormGroup} from '@angular/forms';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {UserType} from '../../../shared/models/UserType';

@Component({
  selector: 'app-ad-filter-panel',
  templateUrl: './ad-filter-panel.component.html',
  styleUrls: ['./ad-filter-panel.component.css']
})
export class AdFilterPanelComponent implements OnInit {
  sliderValues: { min: number, max: number };
  voivodeships$: Observable<Voivodeship[]>;

  @Input() wantedUserType: UserType;
  @Output() changedFilters = new EventEmitter<FormGroup>();

  adFiltersForm = new FormGroup({
    wanted: new FormGroup({
      voivodeships: new FormControl(),
      location: new FormControl(),
      genderMale: new FormControl(false),
      genderFemale: new FormControl(false),
      ageRange: new FormControl({min: 0, max: 100}),
      genres: new FormControl(),
      instruments: new FormControl()
    }),
    looking: new FormGroup({
      musicianUser: new FormControl(false),
      bandUser: new FormControl(false),
      regularUser: new FormControl(false),
      commercial: new FormControl(false),
      genres: new FormControl(),
      instruments: new FormControl()
    }),
  });

  constructor(private voivodeshipService: VoivodeshipService) {
  }

  ngOnInit(): void {
    this.sliderValues = {min: 0, max: 100};
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
    this.adFiltersForm.valueChanges.pipe(debounceTime(1000)).subscribe(_ => {
      this.changedFilters.emit(this.adFiltersForm);
      console.log('ad filters emitted after debounce time');
    });
  }
}
