import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-soundcloud-widget',
  templateUrl: './soundcloud-widget.component.html',
  styleUrls: ['./soundcloud-widget.component.css']
})
export class SoundcloudWidgetComponent implements OnInit {
  @Input() soundcloudProfileLink: string;
  safeApiUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const apiLink = `https://w.soundcloud.com/player/?url=${this.soundcloudProfileLink}`;
    this.safeApiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(apiLink);
  }

}
