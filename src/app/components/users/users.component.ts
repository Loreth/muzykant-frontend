import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UserServiceFactoryService} from '../../core/services/user-service-factory.service';
import {User} from '../../shared/models/user';
import {UserService} from '../../core/services/user.service';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {UserType} from '../../shared/models/user-type';
import {AdChip, ChipCssClass} from '../../shared/models/ad-chip';
import {map, tap} from 'rxjs/operators';
import {UserImageService} from '../../core/services/user-image.service';
import {AuthService} from '../../core/services/auth.service';
import {LocalizationUtils} from '../../shared/localization/localization-utils';
import {Person} from '../../shared/models/person';
import moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user$: Observable<User>;
  genreChips: AdChip[];
  instrumentChips: AdChip[];
  userImages$: Observable<any[]>;

  constructor(private userServiceFactoryService: UserServiceFactoryService,
              private userService: UserService,
              private userImageService: UserImageService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userLinkName = params['link-name'];
      this.userService.searchDtos(new HttpParams().set('linkName', userLinkName)).subscribe(
        page => {
          const user = page.content[0];
          this.user$ = this.userServiceFactoryService.getUserService(user.userType).getDto(user.id).pipe(
            tap(typedUser => {
              this.makeGenreChips(typedUser);
              this.makeInstrumentChips(typedUser);
            })
          );
          this.userImages$ = this.userImageService
          .searchDtos(new HttpParams().set('userId', String(user.id)), 0, 50, ['orderIndex,ASC'])
          .pipe(map(imagePage => imagePage.content.map(image => {
              return {image: image.link, thumbImage: image.link};
            })
          ));
        }
      );
    });
  }

  navigateBack(): void {
    this.location.back();
  }

  getFallbackIconName(user: User): string {
    return user.userType === UserType.BAND ? 'supervised_user_circle' : 'user_circle';
  }

  private makeGenreChips(user: User): AdChip[] {
    if (!user.genres) {
      return null;
    }
    this.genreChips = AdChip.makeNameableChips(user.genres, ChipCssClass.GENRE);
    this.genreChips.sort((a, b) => a.label.localeCompare(b.label));
    return this.genreChips;
  }

  private makeInstrumentChips(user: User): AdChip[] {
    if (!user.instruments) {
      return null;
    }
    this.instrumentChips = AdChip.makeNameableChips(user.instruments, ChipCssClass.INSTRUMENT);
    this.instrumentChips.sort((a, b) => a.label.localeCompare(b.label));
    return this.instrumentChips;
  }

  isLoggedUsersProfile(user: User): boolean {
    return user.id === AuthService.loggedUserId;
  }

  localizeUserType(userType: UserType): string {
    return LocalizationUtils.localizeUserType(userType);
  }

  localizeGender(gender: string): string {
    return LocalizationUtils.localizeGender(gender);
  }

  getPersonAge(person: Person): number {
    return moment().diff(person.birthdate, 'years');
  }

  // userAsMusician(user: User): Musician {
  //   return user.userType === UserType.MUSICIAN ? user as Musician : null;
  // }
}
