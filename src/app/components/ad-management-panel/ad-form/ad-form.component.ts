import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl} from '@angular/forms';
import {AdType} from '../../../shared/models/ad-type';
import {map} from 'rxjs/operators';
import {GenreService} from '../../../core/services/genre.service';
import {InstrumentService} from '../../../core/services/instrument.service';
import {Observable} from 'rxjs';
import {Genre} from '../../../shared/models/genre';
import {Instrument} from '../../../shared/models/instrument';
import {TextUtils} from '../../../shared/text-utils';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {Voivodeship} from '../../../shared/models/voivodeship';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.css']
})
export class AdFormComponent implements OnInit {
  adType = new FormControl(AdType.MUSICIAN_WANTED);
  adTypEnum = AdType;
  voivodeships$: Observable<Voivodeship[]>;
  genres$: Observable<Genre[]>;
  instruments$: Observable<Instrument[]>;
  adForm = this.fb.group({
    voivodeships: [],
    location: [''],
    description: [''],
    genres: [],
    instruments: [],
    commercial: [],
    genderMale: [false],
    genderFemale: [false],
    ageRange: [{min: 0, max: 100}]
  });
  descriptionMaxLength = 1000;
  sliderValues = {min: 0, max: 100};

  get ageRange(): AbstractControl {
    return this.adForm.get('ageRange');
  }

  constructor(private fb: FormBuilder,
              private voivodeshipService: VoivodeshipService,
              private genreService: GenreService,
              private instrumentService: InstrumentService) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
    this.genres$ = this.genreService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
    this.instruments$ = this.instrumentService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
  }

  limitMaxLines(event: Event, maxLines: number): void {
    TextUtils.limitMaxLines(event, maxLines);
  }

  remainingDescriptionCharacters(): number {
    return this.descriptionMaxLength - (this.adForm.get('description').value?.length || 0);
  }

  showPersonalSection(): boolean {
    return this.adType.value === AdType.MUSICIAN_WANTED;
  }

  onSubmit(): void {
    if (this.adForm.valid) {
      // console.log('validated accountDetailsForm submitted');
      //
      // this.user.genres = this.genres.value;
      // this.user.instruments = this.instruments.value;
      // this.user.description = this.description.value;
      // console.log(this.user);
      // this.userService.updateDto(this.user).subscribe(response => {
      //   this.openSnackBar(response != null);
      // });
    }
  }
}
