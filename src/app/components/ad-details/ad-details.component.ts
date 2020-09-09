import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, Subject} from 'rxjs';
import {UserType} from '../../shared/models/UserType';
import {LocalizationUtils} from '../../shared/localization-utils';
import {AdWithChips} from '../../shared/models/ad-with-chips';
import {AdType} from '../../shared/models/AdType';
import {User} from '../../shared/models/user';
import {Nameable} from '../../shared/models/nameable.model';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {UserServiceFactoryService} from '../../core/services/user-service-factory.service';
import {AdChip, ChipCssClass} from '../../shared/models/ad-chip';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  @Input() adWithChips$: Observable<AdWithChips>;
  postingUser$: Subject<User> = new Subject();
  genreChips: AdChip[];
  instrumentChips: AdChip[];
  ageChip: AdChip;
  genderChip: AdChip;
  userGenreChips: AdChip[];
  userInstrumentsChips: AdChip[];

  constructor(private location: Location,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private userServiceFactoryService: UserServiceFactoryService) {
    iconRegistry.addSvgIcon('soundcloud', sanitizer.bypassSecurityTrustResourceUrl('assets/img/soundcloud.svg'));
    iconRegistry.addSvgIcon('youtube', sanitizer.bypassSecurityTrustResourceUrl('assets/img/youtube.svg'));
    iconRegistry.addSvgIcon('user_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/account_circle-black-48dp.svg'));
  }

  ngOnInit(): void {
    this.adWithChips$.subscribe(adWithChips => {
        this.genreChips = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.GENRE);
        this.instrumentChips = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.INSTRUMENT);
        this.ageChip = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.AGE)[0];
        this.genderChip = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.GENDER)[0];

        this.userServiceFactoryService.getUserService(adWithChips.ad.userType).getDto(adWithChips.ad.userId).subscribe(
          user => this.postingUser$.next(user)
        );
      }
    );

    this.postingUser$.subscribe(user => {
      this.userGenreChips = user.genres.map(genre => new AdChip(genre.name, ChipCssClass.GENRE));
      this.userInstrumentsChips = user.genres.map(instrument => new AdChip(instrument.name, ChipCssClass.INSTRUMENT));
    });
  }

  getJoinedNames(nameable: Nameable<any>[]): string {
    return nameable.map(genre => genre.name).join(', ');
  }

  localizeUserType(userType: UserType): string {
    return LocalizationUtils.localizeUserType(userType);
  }

  getAdHeaderName(adType: AdType): string {
    switch (adType) {
      case AdType.MUSICIAN_WANTED:
        return 'Poszukiwany muzyk';
      case AdType.BAND_WANTED:
        return 'Poszukiwany zespół';
      case AdType.JAM_SESSION:
        return 'Jam session';
    }
  }

  navigateBack(): void {
    this.location.back();
  }
}
