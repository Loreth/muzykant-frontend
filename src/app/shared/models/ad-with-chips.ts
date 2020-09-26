import {Ad} from './ad';
import {AdChip} from './ad-chip';

export class AdWithChips {
  ad: Ad;
  chips: AdChip[];

  constructor(ad: Ad, chips: AdChip[]) {
    this.ad = ad;
    this.chips = chips;
  }

  public static mapToAdsWithChips(ads: Ad[]): AdWithChips[] {
    const adsWithChips = [];
    for (const ad of ads) {
      adsWithChips.push(new AdWithChips(ad, AdChip.makeAdChips(ad)));
    }
    return adsWithChips;
  }
}
