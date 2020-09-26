import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {GenreService} from '../../../core/services/genre.service';
import {InstrumentService} from '../../../core/services/instrument.service';
import {Genre} from '../../../shared/models/genre';
import {Instrument} from '../../../shared/models/instrument';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserServiceFactoryService} from '../../../core/services/user-service-factory.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountDetailsForm = new FormGroup({
    genres: new FormControl(),
    instruments: new FormControl(),
    description: new FormControl('')
  });
  user: User;
  genres$: Observable<Genre[]>;
  instruments$: Observable<Instrument[]>;
  userService;
  snackbarDurationInSeconds = 2.5;
  descriptionMaxLength = 1000;

  get genres(): AbstractControl {
    return this.accountDetailsForm.get('genres');
  }

  get instruments(): AbstractControl {
    return this.accountDetailsForm.get('instruments');
  }

  get description(): AbstractControl {
    return this.accountDetailsForm.get('description');
  }

  constructor(private userServiceFactoryService: UserServiceFactoryService,
              private genreService: GenreService,
              private instrumentService: InstrumentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService = this.userServiceFactoryService.getUserServiceByAuthority(AuthService.loggedUserAuthority);
    this.userService.getDto(AuthService.loggedUserId).subscribe(
      user => {
        this.user = user;
        this.accountDetailsForm.setValue({genres: user.genres, instruments: user.instruments, description: user.description});
      }
    );

    this.genres$ = this.genreService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
    this.instruments$ = this.instrumentService.getDtosPage(0, 2000, ['name']).pipe(
      map(page => page.content)
    );
  }

  onSubmit(): void {
    if (this.accountDetailsForm.valid) {
      console.log('validated accountDetailsForm submitted');

      this.user.genres = this.genres.value;
      this.user.instruments = this.instruments.value;
      this.user.description = this.description.value;
      console.log(this.user);
      this.userService.updateDto(this.user).subscribe(response => {
        this.openSnackBar(response != null);
      });
    }
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

  limitMaxLines(event: Event, maxLines: number): void {
    const text = (event.target as HTMLTextAreaElement).value;
    if (text.length > 0) {
      const lineCount = 1 + text.replace(/[^\n]/g, '').length;
      if (lineCount > maxLines) {
        const textArray = text.split('\n');
        (event.target as HTMLTextAreaElement).value = textArray.reduce((result, line, lineNum) => {
          if (lineNum < maxLines) {
            return result.concat('\n').concat(line);
          }
          return result.concat(line);
        });
      }
    }
  }

  remainingDescriptionCharacters(): number {
    return this.descriptionMaxLength - (this.description.value?.length || 0);
  }
}
