import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../../shared/models/voivodeship';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Person} from '../../../../shared/models/person';
import {RegularUser} from '../../../../shared/models/regular-user';
import {RegularUserService} from '../../../../core/services/regular-user.service';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-regular-user-basic-info',
  templateUrl: './regular-user-basic-info.component.html',
  styleUrls: ['./regular-user-basic-info.component.css']
})
export class RegularUserBasicInfoComponent implements OnInit {
  @Input() voivodeships$: Observable<Voivodeship[]>;
  @Output() changesSavedEvent = new EventEmitter<boolean>();
  basicInfoForm = new FormGroup({
    user: new FormControl(),
    phone: new FormControl(''),
    person: new FormControl()
  });
  regularUser: RegularUser;
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

  constructor(private regularUserService: RegularUserService) {
  }

  ngOnInit(): void {
    this.regularUserService.getDto(AuthService.loggedUserId).subscribe(
      regularUser => {
        this.regularUser = regularUser;
        this.user.setValue(regularUser);
        this.phone.setValue(regularUser.phone);
        this.person.setValue(regularUser.person);
      }
    );
  }

  onSubmit(): void {
    if (this.basicInfoForm.valid) {
      console.log('validated basicInfoForm submitted');

      const formUser = this.user.value as RegularUser;
      this.regularUser.voivodeship = formUser.voivodeship;
      this.regularUser.city = formUser.city;
      this.regularUser.phone = this.phone.value;
      this.regularUser.person = this.person.value as Person;
      console.log(this.regularUser);
      this.regularUserService.updateDto(this.regularUser).subscribe(response => {
        this.changesSavedEvent.emit(response != null);
      });
    }
  }
}
