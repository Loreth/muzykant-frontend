import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../shared/models/voivodeship.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {map} from 'rxjs/operators';
import {FIELD_REQUIRED_MSG} from '../../../shared/message-constants';
import {Router} from '@angular/router';
import {BandService} from '../../../core/services/band.service';
import {Band} from '../../../shared/models/band.model';
import {TokenStorageService} from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css']
})
export class CreateBandComponent implements OnInit {
  requiredMessage = FIELD_REQUIRED_MSG;
  currentYear = new Date().getFullYear();
  voivodeships$: Observable<Voivodeship[]>;
  bandForm = new FormGroup({
    user: new FormControl(),
    name: new FormControl('', Validators.required),
    formationYear: new FormControl(null,
      [Validators.min(1900), Validators.max(this.currentYear), Validators.pattern('^[0-9]{4}$')]),
  });
  formSubmittedStatus: Subject<boolean> = new Subject();

  get name(): AbstractControl {
    return this.bandForm.get('name');
  }

  get formationYear(): AbstractControl {
    return this.bandForm.get('formationYear');
  }

  constructor(private voivodeshipService: VoivodeshipService, private bandService: BandService, private router: Router) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
  }

  onSubmit(): void {
    this.formSubmittedStatus.next(true);
    if (this.bandForm.status === 'PENDING') {
      this.bandForm.statusChanges.subscribe(_ => this.doSubmit());
    }
    this.doSubmit();
  }

  doSubmit(): void {
    if (this.bandForm.valid) {
      console.log('validated createUserForm submitted');

      const band = this.bandForm.get('user').value as Band;
      band.name = this.name.value;
      band.formationYear = this.formationYear.value;
      console.log(band);
      this.bandService.addDto(band).subscribe(response => {
        const claims = TokenStorageService.getClaims();
        claims.linkName = response.linkName;
        claims.authority = 'ROLE_BAND';
        TokenStorageService.setClaims(claims);
        this.router.navigateByUrl('/account');
      });
    }
  }
}
