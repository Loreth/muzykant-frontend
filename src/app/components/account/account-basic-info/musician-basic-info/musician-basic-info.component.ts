import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../../shared/models/voivodeship';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {MusicianService} from '../../../../core/services/musician.service';
import {Musician} from '../../../../shared/models/musician';
import {Person} from '../../../../shared/models/person';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-musician-basic-info',
  templateUrl: './musician-basic-info.component.html',
  styleUrls: ['./musician-basic-info.component.css']
})
export class MusicianBasicInfoComponent implements OnInit {
  @Input() voivodeships$: Observable<Voivodeship[]>;
  @Output() changesSavedEvent = new EventEmitter<boolean>();
  basicInfoForm = new FormGroup({
    user: new FormControl(),
    phone: new FormControl(''),
    person: new FormControl()
  });
  musician: Musician;
  formSubmittedStatus: Subject<boolean> = new Subject();

  get user(): AbstractControl {
    return this.basicInfoForm.get('user');
  }

  get phone(): AbstractControl {
    return this.basicInfoForm.get('phone');
  }

  get person(): AbstractControl {
    return this.basicInfoForm.get('person');
  }

  constructor(private musicianService: MusicianService) {
  }

  ngOnInit(): void {
    this.musicianService.getDto(AuthService.loggedUserId).subscribe(
      musician => {
        this.musician = musician;
        this.user.setValue(musician);
        this.phone.setValue(musician.phone);
        this.person.setValue(musician.person);
      }
    );
  }

  onSubmit(): void {
    if (this.basicInfoForm.valid) {
      console.log('validated basicInfoForm submitted');

      const formUser = this.user.value as Musician;
      this.musician.voivodeship = formUser.voivodeship;
      this.musician.city = formUser.city;
      this.musician.phone = this.phone.value;
      this.musician.person = this.person.value as Person;
      console.log(this.musician);
      this.musicianService.updateDto(this.musician).subscribe(response => {
        this.changesSavedEvent.emit(response != null);
      });
    }
  }
}
