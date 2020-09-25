import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../shared/models/voivodeship';
import {FormControl, FormGroup} from '@angular/forms';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {map} from 'rxjs/operators';
import {RegularUserService} from '../../../core/services/regular-user.service';
import {Person} from '../../../shared/models/person';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {RegularUser} from '../../../shared/models/regular-user';
import {Authority} from '../../../shared/models/authority';

@Component({
  selector: 'app-create-regular-user',
  templateUrl: './create-regular-user.component.html',
  styleUrls: ['./create-regular-user.component.css']
})
export class CreateRegularUserComponent implements OnInit {
  @Output() canDeactivate: EventEmitter<boolean> = new EventEmitter();
  voivodeships$: Observable<Voivodeship[]>;
  regularUserForm = new FormGroup({
    user: new FormControl(),
    person: new FormControl()
  });
  formSubmittedStatus: Subject<boolean> = new Subject();
  disableSubmitButton = false;

  constructor(private voivodeshipService: VoivodeshipService, private regularUserService: RegularUserService, private router: Router) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
    this.regularUserForm.get('user').statusChanges.subscribe(status => {
      this.disableSubmitButton = status === 'PENDING';
    });
  }

  onSubmit(): void {
    this.formSubmittedStatus.next(true);
    this.doSubmit();
  }

  doSubmit(): void {
    if (this.regularUserForm.valid) {
      console.log('validated createUserForm submitted');

      const regularUser = this.regularUserForm.get('user').value as RegularUser;
      regularUser.person = this.regularUserForm.get('person').value as Person;
      console.log(regularUser);
      this.regularUserService.addDto(regularUser).subscribe(response => {
        this.canDeactivate.emit(true);
        const claims = TokenStorageService.getClaims();
        claims.userId = response.id;
        claims.linkName = response.linkName;
        claims.authority = Authority.ROLE_REGULAR_USER;
        TokenStorageService.setClaims(claims);
        this.router.navigateByUrl('/account');
      });
    }
  }
}
