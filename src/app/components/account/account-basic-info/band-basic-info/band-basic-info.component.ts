import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../../shared/models/voivodeship';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {BandService} from '../../../../core/services/band.service';
import {Band} from '../../../../shared/models/band';
import {AuthService} from '../../../../core/services/auth.service';
import {FIELD_REQUIRED_MSG} from '../../../../shared/message-constants';

@Component({
  selector: 'app-band-basic-info',
  templateUrl: './band-basic-info.component.html',
  styleUrls: ['./band-basic-info.component.css']
})
export class BandBasicInfoComponent implements OnInit {
  requiredMessage = FIELD_REQUIRED_MSG;
  @Input() voivodeships$: Observable<Voivodeship[]>;
  @Output() changesSavedEvent = new EventEmitter<boolean>();
  currentYear = new Date().getFullYear();
  basicInfoForm = new FormGroup({
    user: new FormControl(),
    name: new FormControl('', Validators.required),
    formationYear: new FormControl(null,
      [Validators.min(1900), Validators.max(this.currentYear), Validators.pattern('^[0-9]{4}$')]),
    phone: new FormControl('')
  });
  band: Band;
  formSubmittedStatus: Subject<boolean> = new Subject();

  get user(): AbstractControl {
    return this.basicInfoForm.get('user');
  }

  get name(): AbstractControl {
    return this.basicInfoForm.get('name');
  }

  get formationYear(): AbstractControl {
    return this.basicInfoForm.get('formationYear');
  }

  get phone(): AbstractControl {
    return this.basicInfoForm.get('phone');
  }

  constructor(private bandService: BandService) {
  }

  ngOnInit(): void {
    this.bandService.getDto(AuthService.loggedUserId).subscribe(
      band => {
        this.band = band;
        this.user.setValue(band);
        this.formationYear.setValue(band.formationYear);
        this.name.setValue(band.name);
        this.phone.setValue(band.phone);
        AuthService.userDisplayName = band.displayName;
      }
    );
  }

  onSubmit(): void {
    if (this.basicInfoForm.valid) {
      console.log('validated basicInfoForm submitted');

      const formUser = this.user.value as Band;
      this.band.name = this.name.value;
      this.band.formationYear = this.formationYear.value;
      this.band.voivodeship = formUser.voivodeship;
      this.band.city = formUser.city;
      this.band.phone = this.phone.value;
      console.log(this.band);
      this.bandService.updateDto(this.band).subscribe(response => {
        this.changesSavedEvent.emit(response != null);
        AuthService.userDisplayName = response.displayName;
      });
    }
  }
}
