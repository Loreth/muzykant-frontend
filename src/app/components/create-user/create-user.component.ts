import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserType} from '../../shared/models/user-type';
import {LocalizationUtils} from '../../shared/localization-utils';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userTypes = [
    {type: UserType.MUSICIAN, viewValue: LocalizationUtils.localizeUserType(UserType.MUSICIAN)},
    {type: UserType.BAND, viewValue: LocalizationUtils.localizeUserType(UserType.BAND)},
    {type: UserType.REGULAR, viewValue: LocalizationUtils.localizeUserType(UserType.REGULAR)}
  ];
  userTypeControl = new FormControl(this.userTypes[0].type);
  selectedUserType: UserType = this.userTypes[0].type;

  constructor() {
  }
}
