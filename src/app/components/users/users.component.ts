import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UserServiceFactoryService} from '../../core/services/user-service-factory.service';
import {User} from '../../shared/models/user';
import {UserService} from '../../core/services/user.service';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {UserType} from '../../shared/models/user-type';
import {AdChip, ChipCssClass} from '../../shared/models/ad-chip';
import {map, tap} from 'rxjs/operators';
import {UserImageService} from '../../core/services/user-image.service';
import {AuthService} from '../../core/services/auth.service';
import {LocalizationUtils} from '../../shared/localization/localization-utils';
import {Person} from '../../shared/models/person';
import moment from 'moment';
import {AdWithChips} from '../../shared/models/ad-with-chips';
import {MusicianWantedAdService} from '../../core/services/musician-wanted-ad.service';
import {BandWantedAdService} from '../../core/services/band-wanted-ad.service';
import {JamSessionAdService} from '../../core/services/jam-session-ad.service';
import {Ad} from '../../shared/models/ad';

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
  userAdsWithChips$: Observable<AdWithChips[]>;

  constructor(private userServiceFactoryService: UserServiceFactoryService,
              private userService: UserService,
              private userImageService: UserImageService,
              private musicianWantedAdService: MusicianWantedAdService,
              private bandWantedAdService: BandWantedAdService,
              private jamSessionAdService: JamSessionAdService,
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
          this.fetchUserAdsWithChips(user.id);
        }
      );
    });
  }

  private fetchUserAdsWithChips(userId: number): void {
    const httpParams = new HttpParams().set('userId', String(userId)).set('sort', 'publishedDate,DESC');
    this.userAdsWithChips$ = forkJoin([
      this.musicianWantedAdService.searchDtos(httpParams),
      this.bandWantedAdService.searchDtos(httpParams),
      this.jamSessionAdService.searchDtos(httpParams)]).pipe(
      map(multipleTypeAds => multipleTypeAds.reduce((acc: Ad[], cur) => [...acc, ...cur.content], [])),
      map(ads => AdWithChips.mapToAdsWithChips(ads))
    );
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
}
