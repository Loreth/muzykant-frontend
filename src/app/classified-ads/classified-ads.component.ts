import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-classified-ads',
  templateUrl: './classified-ads.component.html',
  styleUrls: ['./classified-ads.component.css']
})
export class ClassifiedAdsComponent implements OnInit {
  adsNavLinks = [
    {path: 'musician-wanted', label: 'Szukam muzyka'},
    {path: 'band-wanted', label: 'Szukam zespołu'},
    {path: 'jam-session', label: 'Jam Session'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
