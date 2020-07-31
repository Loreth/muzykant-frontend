import {Component, OnInit} from '@angular/core';
import {MusicianWantedAdService} from '../../shared/services/musician-wanted-ad.service';

@Component({
  selector: 'app-musician-wanted-ads',
  templateUrl: './musician-wanted-ads.component.html',
  styleUrls: ['./musician-wanted-ads.component.css']
})
export class MusicianWantedAdsComponent implements OnInit {

  constructor(private musicianWantedAdService: MusicianWantedAdService) {
  }

  ngOnInit(): void {
  }

}
