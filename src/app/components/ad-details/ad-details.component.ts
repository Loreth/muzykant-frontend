import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {AdWithChips} from '../../shared/models/ad-with-chips';
import {AdType} from '../../shared/models/ad-type';
import {User} from '../../shared/models/user';
import {UserServiceFactoryService} from '../../core/services/user-service-factory.service';
import {AdChip, ChipCssClass} from '../../shared/models/ad-chip';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css'],
  animations: [trigger('cardAnimation', [
    state('void', style({opacity: 0})),
    state('*', style({opacity: 1})),
    transition(':enter', animate(`0.33s 80ms ease-out`))
  ])]
})
export class AdDetailsComponent implements OnInit {
  @Input() adWithChips$: Observable<AdWithChips>;
  postingUser$: Observable<User>;
  genreChips: AdChip[];
  instrumentChips: AdChip[];
  ageChip: AdChip;
  genderChip: AdChip;

  constructor(private location: Location,
              private userServiceFactoryService: UserServiceFactoryService) {
  }

  ngOnInit(): void {
    this.adWithChips$.subscribe(adWithChips => {
        this.genreChips = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.GENRE);
        this.instrumentChips = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.INSTRUMENT);
        this.ageChip = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.AGE)[0];
        this.genderChip = adWithChips.chips.filter(chip => chip.cssClass === ChipCssClass.GENDER)[0];
        this.postingUser$ = this.userServiceFactoryService.getUserService(adWithChips.ad.userType).getDto(adWithChips.ad.userId);
        this.genreChips.sort((a, b) => a.label.localeCompare(b.label));
        this.instrumentChips.sort((a, b) => a.label.localeCompare(b.label));
      }
    );
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
