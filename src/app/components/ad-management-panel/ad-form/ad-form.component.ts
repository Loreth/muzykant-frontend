import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
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
import {AdServiceFactoryService} from '../../../core/services/ad-service-factory.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MusicianWantedAd} from '../../../shared/models/musician-wanted-ad';
import {Comparators} from '../../../shared/comparators';
import {Ad} from '../../../shared/models/ad';
import {AuthService} from '../../../core/services/auth.service';
import {formatDate} from '@angular/common';
import {FIELD_REQUIRED_MSG} from '../../../shared/localization/message-constants';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.css']
})
export class AdFormComponent implements OnInit {
  adType = new FormControl(AdType.MUSICIAN_WANTED);
  adTypeEnum = AdType;
  voivodeships$: Observable<Voivodeship[]>;
  genres$: Observable<Genre[]>;
  instruments$: Observable<Instrument[]>;
  adForm = this.fb.group({
    voivodeships: [null, Validators.required],
    location: [null, Validators.required],
    description: [],
    preferredGenres: [],
    preferredInstruments: [],
    commercial: [],
    genderMale: [false],
    genderFemale: [false],
    ageRange: [{min: 0, max: 100}],
    publishedDate: [],
    userId: [AuthService.loggedUserId]
  });
  descriptionMaxLength = 1000;
  sliderValues = {min: 0, max: 100};
  editableAdId: number;
  compareById = Comparators.compareById;
  requiredMessage = FIELD_REQUIRED_MSG;

  get ageRange(): AbstractControl {
    return this.adForm.get('ageRange');
  }

  get genderMale(): AbstractControl {
    return this.adForm.get('genderMale');
  }

  get genderFemale(): AbstractControl {
    return this.adForm.get('genderFemale');
  }

  get adLocation(): AbstractControl {
    return this.adForm.get('location');
  }

  get voivodeships(): AbstractControl {
    return this.adForm.get('voivodeships');
  }

  constructor(private fb: FormBuilder,
              private voivodeshipService: VoivodeshipService,
              private genreService: GenreService,
              private instrumentService: InstrumentService,
              private adServiceFactoryService: AdServiceFactoryService,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
    this.genres$ = this.genreService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
    this.instruments$ = this.instrumentService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
    this.editableAdId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.editableAdId) {
      const editableAdType = this.route.snapshot.queryParamMap.get('adType') as AdType;
      this.adType.setValue(editableAdType);
      this.adType.disable();
      this.adServiceFactoryService.getAdService(editableAdType).getDto(this.editableAdId).subscribe(
        ad => {
          this.adForm.patchValue(ad);
          if (editableAdType === AdType.MUSICIAN_WANTED) {
            const musicianWantedAd = ad as MusicianWantedAd;
            this.ageRange.setValue({min: musicianWantedAd.minAge, max: musicianWantedAd.maxAge ? musicianWantedAd.maxAge : 100});
            this.genderMale.setValue(musicianWantedAd.preferredGender === 'M');
            this.genderFemale.setValue(musicianWantedAd.preferredGender === 'F');
          }
        }
      );
    }
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

  getHeaderName(): string {
    return this.editableAdId ? `Edytowanie ogłoszenia z dnia
    ${formatDate(this.adForm.get('publishedDate').value, 'dd.MM.yyyy', this.locale)}` : 'Nowe ogłoszenie';
  }

  getSubmitButtonLabel(): string {
    return this.editableAdId ? 'Zapisz zmiany' : 'Utwórz ogłoszenie';
  }

  navigateBack(): void {
    this.router.navigateByUrl('my-ads', {state: {message: null}});
  }

  onSubmit(): void {
    if (this.adForm.valid) {
      let ad = this.adForm.getRawValue() as Ad;
      ad = this.setPersonalValuesIfAdequate(ad);
      const adService = this.adServiceFactoryService.getAdService(this.adType.value);

      if (this.editableAdId) {
        ad.id = this.editableAdId;
        adService.updateDto(ad).subscribe(
          () => this.router.navigateByUrl('my-ads', {state: {message: 'Ogłoszenie zostało zmodyfikowane'}})
        );
      } else {
        adService.addDto(ad).subscribe(() => this.router.navigateByUrl(
          'my-ads', {state: {message: 'Ogłoszenie zostało utworzone'}})
        );
      }
    }
  }

  private setPersonalValuesIfAdequate(ad: Ad): Ad {
    if (this.adType.value === AdType.MUSICIAN_WANTED) {
      const musicianWantedAd = ad as MusicianWantedAd;
      musicianWantedAd.minAge = this.ageRange.value.min;
      musicianWantedAd.maxAge = this.ageRange.value.max;
      const male = this.genderMale.value;
      const female = this.genderFemale.value;

      if ((male && !female) || (!male && female)) {
        if (male) {
          musicianWantedAd.preferredGender = 'M';
        } else {
          musicianWantedAd.preferredGender = 'F';
        }
      }
      return musicianWantedAd;
    }
    return ad;
  }
}
