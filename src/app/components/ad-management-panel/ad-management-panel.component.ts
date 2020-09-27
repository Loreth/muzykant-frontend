import {Component, OnInit} from '@angular/core';
import {MusicianWantedAdService} from '../../core/services/musician-wanted-ad.service';
import {BandWantedAdService} from '../../core/services/band-wanted-ad.service';
import {JamSessionAdService} from '../../core/services/jam-session-ad.service';
import {forkJoin, Observable} from 'rxjs';
import {Ad} from '../../shared/models/ad';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../../core/services/auth.service';
import {map} from 'rxjs/operators';
import {AdWithChips} from '../../shared/models/ad-with-chips';

@Component({
  selector: 'app-ad-management-panel',
  templateUrl: './ad-management-panel.component.html',
  styleUrls: ['./ad-management-panel.component.css']
})
export class AdManagementPanelComponent implements OnInit {
  userAdsWithChips$: Observable<AdWithChips[]>;

  constructor(private musicianWantedAdService: MusicianWantedAdService,
              private bandWantedAdService: BandWantedAdService,
              private jamSessionAdService: JamSessionAdService) {
  }

  ngOnInit(): void {
    const httpParams = new HttpParams().set('userId', String(AuthService.loggedUserId));
    this.userAdsWithChips$ = forkJoin([
      this.musicianWantedAdService.searchDtos(httpParams),
      this.bandWantedAdService.searchDtos(httpParams),
      this.jamSessionAdService.searchDtos(httpParams)]).pipe(
      map(multipleTypeAds => multipleTypeAds.reduce((acc: Ad[], cur) => [...acc, ...cur.content], [])),
      map(ads => AdWithChips.mapToAdsWithChips(ads)));
  }
}
