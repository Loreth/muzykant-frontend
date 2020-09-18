import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../../shared/models/voivodeship';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {BandService} from '../../../../core/services/band.service';
import {Band} from '../../../../shared/models/band';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-band-basic-info',
  templateUrl: './band-basic-info.component.html',
  styleUrls: ['./band-basic-info.component.css']
})
export class BandBasicInfoComponent implements OnInit {
  @Input() voivodeships$: Observable<Voivodeship[]>;
  @Output() changesSavedEvent = new EventEmitter<boolean>();
  basicInfoForm = new FormGroup({
    user: new FormControl(),
    phone: new FormControl('')
  });
  band: Band;
  formSubmittedStatus: Subject<boolean> = new Subject();

  get user(): AbstractControl {
    return this.basicInfoForm.get('user');
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
        this.phone.setValue(band.phone);
      }
    );
  }

  onSubmit(): void {
    if (this.basicInfoForm.valid) {
      console.log('validated basicInfoForm submitted');

      const formUser = this.user.value as Band;
      this.band.voivodeship = formUser.voivodeship;
      this.band.city = formUser.city;
      this.band.phone = this.phone.value;
      console.log(this.band);
      this.bandService.updateDto(this.band).subscribe(response => {
        this.changesSavedEvent.emit(response != null);
      });
    }
  }
}
