import {Injectable} from '@angular/core';
import {MusicianWantedAdService} from './musician-wanted-ad.service';
import {BandWantedAdService} from './band-wanted-ad.service';
import {JamSessionAdService} from './jam-session-ad.service';
import {AdType} from '../../shared/models/ad-type';
import {Ad} from '../../shared/models/ad';
import {RestSearchService} from './rest-search.service';

@Injectable({
  providedIn: 'root'
})
export class AdServiceFactoryService {

  constructor(private musicianWantedAdService: MusicianWantedAdService,
              private bandWantedAdService: BandWantedAdService,
              private jamSessionAdService: JamSessionAdService) {
  }

  getAdService(adType: AdType): RestSearchService<Ad, number> {
    switch (adType) {
      case AdType.MUSICIAN_WANTED:
        return this.musicianWantedAdService;
      case AdType.BAND_WANTED:
        return this.bandWantedAdService;
      case AdType.JAM_SESSION:
        return this.jamSessionAdService;
    }
  }
}
