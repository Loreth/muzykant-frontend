import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../shared/models/voivodeship';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {map} from 'rxjs/operators';
import {FIELD_REQUIRED_MSG} from '../../../shared/message-constants';
import {Router} from '@angular/router';
import {BandService} from '../../../core/services/band.service';
import {Band} from '../../../shared/models/band';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {Authority} from '../../../shared/models/authority';
import {TokenClaims} from '../../../shared/models/token-claims';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css']
})
export class CreateBandComponent implements OnInit {
  @Output() canDeactivate: EventEmitter<boolean> = new EventEmitter();
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
  disableSubmitButton = false;

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
    this.bandForm.get('user').statusChanges.subscribe(status => {
      this.disableSubmitButton = status === 'PENDING';
    });
  }

  onSubmit(): void {
    this.formSubmittedStatus.next(true);
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
        this.canDeactivate.emit(true);
        const claims: TokenClaims = TokenStorageService.getClaims();
        claims.userId = response.id;
        claims.linkName = response.linkName;
        claims.authority = Authority.ROLE_BAND;
        TokenStorageService.setClaims(claims);
        this.router.navigateByUrl('/account');
      });
    }
  }
}
