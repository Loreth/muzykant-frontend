import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {map} from 'rxjs/operators';
import {Voivodeship} from '../../../shared/models/voivodeship.model';
import {MusicianService} from '../../../core/services/musician.service';
import {Musician} from '../../../shared/models/musician.model';
import {Person} from '../../../shared/models/person';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-create-musician',
  templateUrl: './create-musician.component.html',
  styleUrls: ['./create-musician.component.css']
})
export class CreateMusicianComponent implements OnInit {
  voivodeships$: Observable<Voivodeship[]>;
  musicianForm = new FormGroup({
    user: new FormControl(),
    person: new FormControl()
  });
  formSubmittedStatus: Subject<boolean> = new Subject();

  constructor(private voivodeshipService: VoivodeshipService, private musicianService: MusicianService, private router: Router) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
  }

  onSubmit(): void {
    this.formSubmittedStatus.next(true);
    if (this.musicianForm.status === 'PENDING') {
      this.musicianForm.statusChanges.subscribe();
    }
    this.doSubmit();
  }

  doSubmit(): void {
    if (this.musicianForm.valid) {
      console.log('validated createUserForm submitted');

      const musician = this.musicianForm.get('user').value as Musician;
      musician.person = this.musicianForm.get('person').value as Person;
      console.log(musician);
      this.musicianService.addDto(musician).subscribe(response => {
        const claims = TokenStorageService.getClaims();
        claims.linkName = response.linkName;
        claims.authority = 'ROLE_MUSICIAN';
        TokenStorageService.setClaims(claims);
        this.router.navigateByUrl('/account');
      });
    }
  }
}
