import {Component, Input, OnInit} from '@angular/core';
import {AdWithChips} from '../ad-with-chips';

@Component({
  selector: 'app-someone-wanted-ads',
  templateUrl: './someone-wanted-ads.component.html',
  styleUrls: ['./someone-wanted-ads.component.css']
})
export class SomeoneWantedAdsComponent implements OnInit {
  @Input() adsWithChips: AdWithChips[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getProfileImageLink(): string {
    return null;
  }
}
