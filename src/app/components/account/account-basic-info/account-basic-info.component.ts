import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../shared/models/voivodeship';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {map} from 'rxjs/operators';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {Authority} from '../../../shared/models/authority';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-basic-info',
  templateUrl: './account-basic-info.component.html',
  styleUrls: ['./account-basic-info.component.css']
})
export class AccountBasicInfoComponent implements OnInit {
  voivodeships$: Observable<Voivodeship[]>;
  formSubmittedStatus: Subject<boolean> = new Subject();
  loggedInUserAuthority = TokenStorageService.getClaims().authority;
  authority = Authority;
  snackbarDurationInSeconds = 2.5;

  constructor(private voivodeshipService: VoivodeshipService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
  }

  openSnackBar(success: boolean): void {
    let message = 'Coś poszło nie tak';
    if (success) {
      message = 'Zmiany zostały zapisane';
    }
    this.snackBar.open(message,
      '', {duration: this.snackbarDurationInSeconds * 1000, panelClass: ['snackbar']}
    );
  }
}
