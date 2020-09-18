import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {ActivatedRoute} from '@angular/router';
import {JamSessionAdService} from '../../../core/services/jam-session-ad.service';
import {AdChip} from '../../../shared/models/ad-chip';

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
      this.adWithChips$.next(new AdWithChips(ad, AdChip.makeAdChips(ad)));
      }
    );
  }
}
