import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserType} from '../../shared/models/user-type';
import {LocalizationUtils} from '../../shared/localization-utils';
import {CanComponentDeactivate} from '../../core/guards/auth.guard';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogComponent} from '../../shared/components/alert-dialog/alert-dialog.component';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements CanComponentDeactivate {
  canComponentDeactivate = false;
  userTypes = [
    {type: UserType.MUSICIAN, viewValue: LocalizationUtils.localizeUserType(UserType.MUSICIAN)},
    {type: UserType.BAND, viewValue: LocalizationUtils.localizeUserType(UserType.BAND)},
    {type: UserType.REGULAR, viewValue: LocalizationUtils.localizeUserType(UserType.REGULAR)}
  ];
  userTypeControl = new FormControl(this.userTypes[0].type);
  selectedUserType: UserType = this.userTypes[0].type;

  constructor(private alertDialog: MatDialog, private authService: AuthService) {
  }

  canDeactivate(): boolean {
    if (this.authService.isLoggedIn() && !this.canComponentDeactivate) {
      if (!this.alertDialog.openDialogs.length) {
        this.alertDialog.open(AlertDialogComponent, {
          data: {message: 'Dokończ rejestrację aby kontynuować'}
        });
      }

      return false;
    }
    return true;
  }

  setCanComponentDeactivate(canDeactivate: boolean): void {
    this.canComponentDeactivate = canDeactivate;
  }
}
