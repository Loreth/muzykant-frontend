import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicianWantedAdService} from '../../../core/services/musician-wanted-ad.service';
import {Subject} from 'rxjs';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {AdChip} from '../../../shared/models/ad-chip';

@Component({
  selector: 'app-musician-wanted-ad-details',
  templateUrl: './musician-wanted-ad-details.component.html',
  styleUrls: ['./musician-wanted-ad-details.component.css']
})
export class MusicianWantedAdDetailsComponent implements OnInit {
  adId: number;
  adWithChips$: Subject<AdWithChips> = new Subject();

  constructor(private route: ActivatedRoute,
              private musicianWantedAdService: MusicianWantedAdService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.adId = params.id;
    });

    this.musicianWantedAdService.getDto(this.adId).subscribe(ad => {
      this.adWithChips$.next(new AdWithChips(ad, AdChip.makeAdChips(ad)));
      }
    );
  }
}
