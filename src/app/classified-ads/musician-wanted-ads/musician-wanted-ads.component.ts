import {Component, OnInit} from '@angular/core';
import {MusicianWantedAdService} from '../../shared/services/musician-wanted-ad.service';
import {AdChip, ChipCssClass} from '../ad-chip';
import {MusicianWantedAd} from '../../shared/models/musician-wanted-ad.model';
import {AdWithChips} from '../ad-with-chips';
import {Page} from '../../shared/models/pagination/page';
import {Subject} from 'rxjs';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-musician-wanted-ads',
  templateUrl: './musician-wanted-ads.component.html',
  styleUrls: ['./musician-wanted-ads.component.css']
})
export class MusicianWantedAdsComponent implements OnInit {
  adsPage$: Subject<Page<MusicianWantedAd>> = new Subject();
  adsWithChips$: Subject<AdWithChips[]> = new Subject();

  constructor(private musicianWantedAdService: MusicianWantedAdService) {
  }

  ngOnInit(): void {
    this.musicianWantedAdService
    .getDtosPage(0, 10, ['publishedDate,DESC'])
    .subscribe(page => this.adsPage$.next(page));

    this.adsPage$.subscribe(page => {
      const adsWithChips = [];
      for (const ad of page.content) {
        adsWithChips.push(new AdWithChips(ad, this.makeAdChips(ad)));
      }
      this.adsWithChips$.next(adsWithChips);
    });
  }

  makeAdChips(ad: MusicianWantedAd): AdChip[] {
    const adChips: AdChip[] = [];

    if (ad.preferredGenres) {
      for (const genre of ad.preferredGenres) {
        adChips.push(new AdChip(genre.name, ChipCssClass.GENRE));
      }
    }
    if (ad.preferredInstruments) {
      for (const instrument of ad.preferredInstruments) {
        adChips.push(new AdChip(instrument.name, ChipCssClass.INSTRUMENT));
      }
    }
    if (ad.preferredGender === 'K') {
      adChips.push(new AdChip('Kobieta', ChipCssClass.PERSONAL));
    } else if (ad.preferredGender === 'M') {
      adChips.push(new AdChip('Mężczyzna', ChipCssClass.PERSONAL));
    }
    if (ad.minAge && ad.maxAge) {
      adChips.push(new AdChip(`${ad.minAge.toString()}-${ad.maxAge.toString()} lat`, ChipCssClass.PERSONAL));
    }

    return adChips;
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.musicianWantedAdService
    .searchDtos(filtersForm, 0, 10, ['publishedDate,DESC'])
    .subscribe(page => this.adsPage$.next(page));
  }
}
