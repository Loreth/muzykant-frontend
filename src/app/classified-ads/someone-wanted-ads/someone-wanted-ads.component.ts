import {Component, Input, OnInit} from '@angular/core';
import {Ad} from '../../shared/models/ad.model';
import {AdChip} from '../ad-chip';

@Component({
  selector: 'app-someone-wanted-ads',
  templateUrl: './someone-wanted-ads.component.html',
  styleUrls: ['./someone-wanted-ads.component.css']
})
export class SomeoneWantedAdsComponent implements OnInit {
  // TODO
  @Input() ads: Ad[] = [
    {
      id: 1,
      commercial: false,
      description: 'blabla',
      location: 'Wrocław',
      preferredGenres: null,
      preferredInstruments: null,
      publishedDate: '2020-07-13',
      userId: 1
    },
    {
      id: 2,
      commercial: false,
      description: 'blabla',
      location: 'Wrocław',
      preferredGenres: null,
      preferredInstruments: null,
      publishedDate: '2020-07-15',
      userId: 1
    },
    {
      id: 3,
      commercial: false,
      description: 'blabla',
      location: 'Wrocław',
      preferredGenres: null,
      preferredInstruments: null,
      publishedDate: '2020-07-06',
      userId: 1
    },
  ];
  @Input() adChips: AdChip[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getProfileImageLink(): string {
    return null;
  }
}
