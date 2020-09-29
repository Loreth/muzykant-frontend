import {Component, Input} from '@angular/core';
import {User} from '../../models/user';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Nameable} from '../../models/nameable';
import {UserType} from '../../models/user-type';
import {LocalizationUtils} from '../../localization/localization-utils';
import {Musician} from '../../models/musician';
import {Person} from '../../models/person';
// @ts-ignore
import moment from 'moment';

@Component({
  selector: 'app-user-card-mini',
  templateUrl: './user-card-mini.component.html',
  styleUrls: ['./user-card-mini.component.css']
})
export class UserCardMiniComponent {
  @Input() user: User;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('soundcloud', sanitizer.bypassSecurityTrustResourceUrl('assets/img/soundcloud-fewer-stripes.svg'));
    iconRegistry.addSvgIcon('youtube', sanitizer.bypassSecurityTrustResourceUrl('assets/img/youtube.svg'));
    iconRegistry.addSvgIcon('user_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/account_circle-48dp.svg'));
    iconRegistry.addSvgIcon(
      'supervised_user_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/supervised_user_circle-48dp.svg'));
  }

  getSortedJoinedNames(nameable: Nameable<any>[]): string {
    nameable.sort((a, b) => a.name.localeCompare(b.name));
    return nameable.map(value => value.name).join(', ');
  }

  localizeUserType(userType: UserType): string {
    return LocalizationUtils.localizeUserType(userType);
  }

  localizeGender(gender: string): string {
    return LocalizationUtils.localizeGender(gender);
  }

  userAsMusician(user: User): Musician {
    return user.userType === UserType.MUSICIAN ? user as Musician : null;
  }

  getPersonAge(person: Person): number {
    return moment().diff(person.birthdate, 'years');
  }

  getFallbackIconName(): string {
    return this.user.userType === UserType.BAND ? 'supervised_user_circle' : 'user_circle';
  }
}
