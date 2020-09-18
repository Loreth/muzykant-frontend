import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {ActivatedRoute} from '@angular/router';
import {BandWantedAdService} from '../../../core/services/band-wanted-ad.service';
import {AdChip} from '../../../shared/models/ad-chip';

@Component({
  selector: 'app-band-wanted-ad-details',
  templateUrl: './band-wanted-ad-details.component.html',
  styleUrls: ['./band-wanted-ad-details.component.css']
})
export class BandWantedAdDetailsComponent implements OnInit {
  adId: number;
  adWithChips$: Subject<AdWithChips> = new Subject();

  constructor(private route: ActivatedRoute,
              private bandWantedAdService: BandWantedAdService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.adId = params.id;
    });

    this.bandWantedAdService.getDto(this.adId).subscribe(ad => {
      this.adWithChips$.next(new AdWithChips(ad, AdChip.makeAdChips(ad)));
      }
    );
  }
}
