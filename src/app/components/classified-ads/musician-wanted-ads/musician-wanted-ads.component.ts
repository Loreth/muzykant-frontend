import {Component, OnInit} from '@angular/core';
import {MusicianWantedAdService} from '../../../core/services/musician-wanted-ad.service';
import {AdChip, ChipCssClass} from '../../../shared/models/ad-chip';
import {MusicianWantedAd} from '../../../shared/models/musician-wanted-ad.model';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {Page} from '../../../shared/models/pagination/page';
import {Subject} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {SomeoneWantedAdsComponent} from '../someone-wanted-ads/someone-wanted-ads.component';
import {UserType} from '../../../shared/models/UserType';

@Component({
  selector: 'app-musician-wanted-ads',
  templateUrl: './musician-wanted-ads.component.html',
  styleUrls: ['./musician-wanted-ads.component.css']
})
export class MusicianWantedAdsComponent implements OnInit {

  constructor(private musicianWantedAdService: MusicianWantedAdService) {
  }

  adsPage$: Subject<Page<MusicianWantedAd>> = new Subject();
  adsWithChips$: Subject<AdWithChips[]> = new Subject();
  wantedUserType = UserType.MUSICIAN;

  public static makeAdChips(ad: MusicianWantedAd): AdChip[] {
    const adChips: AdChip[] = SomeoneWantedAdsComponent.makeAdChips(ad);

    if (ad.preferredGender === 'F') {
      adChips.push(new AdChip('Kobieta', ChipCssClass.GENDER));
    } else if (ad.preferredGender === 'M') {
      adChips.push(new AdChip('Mężczyzna', ChipCssClass.GENDER));
    }
    if (ad.minAge && ad.maxAge) {
      adChips.push(new AdChip(`${ad.minAge.toString()}-${ad.maxAge.toString()} lat`, ChipCssClass.AGE));
    }

    return adChips;
  }

  ngOnInit(): void {
    this.musicianWantedAdService
    .getDtosPage(0, 10, ['publishedDate,DESC'])
    .subscribe(page => this.adsPage$.next(page));

    this.adsPage$.subscribe(page => {
      const adsWithChips = [];
      for (const ad of page.content) {
        adsWithChips.push(new AdWithChips(ad, MusicianWantedAdsComponent.makeAdChips(ad)));
      }
      this.adsWithChips$.next(adsWithChips);
    });
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.musicianWantedAdService
    .searchDtosWithForm(filtersForm, 0, 10, ['publishedDate,DESC'])
    .subscribe(page => this.adsPage$.next(page));
  }
}
