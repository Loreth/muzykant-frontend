import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {map} from 'rxjs/operators';
import {Voivodeship} from '../../../shared/models/voivodeship';
import {MusicianService} from '../../../core/services/musician.service';
import {Musician} from '../../../shared/models/musician';
import {Person} from '../../../shared/models/person';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {Authority} from '../../../shared/models/authority';

@Component({
  selector: 'app-create-musician',
  templateUrl: './create-musician.component.html',
  styleUrls: ['./create-musician.component.css']
})
export class CreateMusicianComponent implements OnInit {
  @Output() canDeactivate: EventEmitter<boolean> = new EventEmitter();
  voivodeships$: Observable<Voivodeship[]>;
  musicianForm = new FormGroup({
    user: new FormControl(),
    person: new FormControl()
  });
  formSubmittedStatus: Subject<boolean> = new Subject();
  disableSubmitButton = false;

  constructor(private voivodeshipService: VoivodeshipService, private musicianService: MusicianService, private router: Router) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
    this.musicianForm.get('user').statusChanges.subscribe(status => {
      this.disableSubmitButton = status === 'PENDING';
    });
  }

  onSubmit(): void {
    this.formSubmittedStatus.next(true);
    this.doSubmit();
  }

  doSubmit(): void {
    if (this.musicianForm.valid) {
      console.log('validated createUserForm submitted');

      const musician = this.musicianForm.get('user').value as Musician;
      musician.person = this.musicianForm.get('person').value as Person;
      console.log(musician);
      this.musicianService.addDto(musician).subscribe(response => {
        this.canDeactivate.emit(true);
        const claims = TokenStorageService.getClaims();
        claims.userId = response.id;
        claims.linkName = response.linkName;
        claims.authority = Authority.ROLE_MUSICIAN;
        TokenStorageService.setClaims(claims);
        this.router.navigateByUrl('/account');
      });
    }
  }
}
