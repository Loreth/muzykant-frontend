import {Ad} from './ad';
import {AdChip} from './ad-chip';

export class AdWithChips {
  ad: Ad;
  chips: AdChip[];

  constructor(ad: Ad, chips: AdChip[]) {
    this.ad = ad;
    this.chips = chips;
  }
}