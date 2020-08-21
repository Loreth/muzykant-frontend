import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AdWithChips} from '../../classified-ads/ad-with-chips';
import {ActivatedRoute} from '@angular/router';
import {SomeoneWantedAdsComponent} from '../../classified-ads/someone-wanted-ads/someone-wanted-ads.component';
import {JamSessionAdService} from '../../shared/services/jam-session-ad.service';

@Component({
  selector: 'app-jam-session-ad-details',
  templateUrl: './jam-session-ad-details.component.html',
  styleUrls: ['./jam-session-ad-details.component.css']
})
export class JamSessionAdDetailsComponent implements OnInit {
  adId: number;
  adWithChips$: Subject<AdWithChips> = new Subject();

  constructor(private route: ActivatedRoute,
              private jamSessionAdService: JamSessionAdService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.adId = params.id;
    });

    this.jamSessionAdService.getDto(this.adId).subscribe(ad => {
        this.adWithChips$.next(new AdWithChips(ad, SomeoneWantedAdsComponent.makeAdChips(ad)));
      }
    );
  }
}
