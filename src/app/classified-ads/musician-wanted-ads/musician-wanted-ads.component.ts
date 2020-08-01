import {Component, OnInit} from '@angular/core';
import {MusicianWantedAdService} from '../../shared/services/musician-wanted-ad.service';
import {AdChip, ChipCssClass} from '../ad-chip';
import {MusicianWantedAd} from '../../shared/models/musician-wanted-ad.model';
import {AdWithChips} from '../ad-with-chips';

@Component({
  selector: 'app-musician-wanted-ads',
  templateUrl: './musician-wanted-ads.component.html',
  styleUrls: ['./musician-wanted-ads.component.css']
})
export class MusicianWantedAdsComponent implements OnInit {
  ads: MusicianWantedAd[] = [
    {
      id: 1,
      commercial: false,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id sem augue. Maecenas nibh mauris, ' +
        'bibendum sit amet arcu consectetur, pharetra aliquam mi. Suspendisse dignissim turpis massa, maximus mattis erat' +
        ' interdum sed. Sed finibus suscipit lorem, eu viverra neque. Duis eu justo accumsan, suscipit purus sit amet, hendrerit' +
        ' lorem. Aenean convallis dolor nec ex vulputate, at luctus est cursus. Quisque dui tellus, auctor non venenatis eu, tristique et ipsum.',
      location: 'Wrocław',
      preferredGenres: [{id: 1, name: 'genre1'}, {id: 2, name: 'genre2'}],
      preferredInstruments: [{id: 2, name: 'instru ment2'}],
      publishedDate: '2020-07-13',
      userId: 1,
      preferredGender: 'M',
      minAge: 25,
      maxAge: 35,
      vocalRange: null
    },
    {
      id: 2,
      commercial: false,
      description: null,
      location: 'Wrocław',
      preferredGenres: null,
      preferredInstruments: null,
      publishedDate: '2020-07-15',
      userId: 1,
      preferredGender: 'K',
      minAge: 40,
      maxAge: 70,
      vocalRange: null
    },
    {
      id: 3,
      commercial: false,
      description: 'blablaadsasdas',
      location: 'Wrocław',
      preferredGenres: null,
      preferredInstruments: null,
      publishedDate: '2020-07-06',
      userId: 1,
      preferredGender: null,
      minAge: null,
      maxAge: null,
      vocalRange: null
    },
  ];
  adsWithChips: AdWithChips[] = [];

  constructor(private musicianWantedAdService: MusicianWantedAdService) {
  }

  ngOnInit(): void {
    for (const ad of this.ads) {
      this.adsWithChips.push(new AdWithChips(ad, this.makeAdChips(ad)));
    }
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
}
