import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {GenreService} from '../../../core/services/genre.service';
import {InstrumentService} from '../../../core/services/instrument.service';
import {Genre} from '../../../shared/models/genre';
import {Instrument} from '../../../shared/models/instrument';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserServiceFactoryService} from '../../../core/services/user-service-factory.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TextUtils} from '../../../shared/text-utils';
import {UserType} from '../../../shared/models/user-type';
import {EquipmentService} from '../../../core/services/equipment.service';
import {HttpParams} from '@angular/common/http';
import {Equipment} from '../../../shared/models/equipment';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountDetailsForm = new FormGroup({
    genres: new FormControl(),
    instruments: new FormControl(),
    description: new FormControl(''),
    musicianEquipment: new FormArray([])
  });
  user: User;
  genres$: Observable<Genre[]>;
  instruments$: Observable<Instrument[]>;
  userService;
  snackbarDurationInSeconds = 2.5;
  descriptionMaxLength = 1000;
  musicianType = UserType.MUSICIAN;
  equipmentItems: Equipment[] = [];
  deletedEquipmentItems: Equipment[] = [];

  get genres(): AbstractControl {
    return this.accountDetailsForm.get('genres');
  }

  get instruments(): AbstractControl {
    return this.accountDetailsForm.get('instruments');
  }

  get description(): AbstractControl {
    return this.accountDetailsForm.get('description');
  }

  get musicianEquipmentArray(): FormArray {
    return this.accountDetailsForm.get('musicianEquipment') as FormArray;
  }

  constructor(private userServiceFactoryService: UserServiceFactoryService,
              private genreService: GenreService,
              private instrumentService: InstrumentService,
              private equipmentService: EquipmentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService = this.userServiceFactoryService.getUserServiceByAuthority(AuthService.loggedUserAuthority);
    this.userService.getDto(AuthService.loggedUserId).subscribe(
      user => {
        this.user = user;
        this.accountDetailsForm.patchValue(user);
        if (this.user.userType === UserType.MUSICIAN) {
          this.equipmentService.searchDtos(new HttpParams().set('musicianId', user.id), 0, 20, ['name']).subscribe(
            page => {
              this.equipmentItems = page.content;
              page.content.map(item => new FormControl(item.name, Validators.required)).forEach(
                control => this.musicianEquipmentArray.push(control)
              );
            }
          );
        }
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
      console.log(this.equipmentItems);
      console.log(this.deletedEquipmentItems);
      this.saveEquipment();
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
    TextUtils.limitMaxLines(event, maxLines);
  }

  remainingDescriptionCharacters(): number {
    return this.descriptionMaxLength - (this.description.value?.length || 0);
  }

  addEquipmentItem(): void {
    const newItem: Equipment = {
      id: null,
      name: '',
      musicianId: this.user.id
    };
    this.equipmentItems.push(newItem);
    this.musicianEquipmentArray.push(new FormControl('', Validators.required));
  }

  deleteEquipmentItem(itemIndex: number): void {
    this.deletedEquipmentItems.push(this.equipmentItems[itemIndex]);
    this.equipmentItems.splice(itemIndex, 1);
    this.musicianEquipmentArray.removeAt(itemIndex);
  }

  isLastEquipmentInputBlank(): boolean {
    if (this.musicianEquipmentArray.length === 0) {
      return false;
    }
    return this.musicianEquipmentArray.at(this.musicianEquipmentArray.length - 1).value?.trim().length === 0;
  }

  saveEquipment(): void {
    this.deletedEquipmentItems.forEach(item => {
      if (item.id) {
        this.equipmentService.deleteDto(item).subscribe();
      }
    });
    for (let i = 0; i < this.equipmentItems.length; i++) {
      const item = this.equipmentItems[i];
      item.name = this.musicianEquipmentArray.at(i).value;
      if (item.id) {
        this.equipmentService.updateDto(item).subscribe();
      } else {
        this.equipmentService.addDto(item).subscribe();
      }
    }
  }
}
