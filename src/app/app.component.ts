import {Component, OnInit} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {TokenStorageService} from './core/services/token-storage.service';
import {rxStompConfig} from './config/rx-stomp.config';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'muzykant-frontend';

  constructor(private rxStompService: RxStompService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('soundcloud', sanitizer.bypassSecurityTrustResourceUrl('assets/img/soundcloud-fewer-stripes.svg'));
    iconRegistry.addSvgIcon('youtube', sanitizer.bypassSecurityTrustResourceUrl('assets/img/youtube.svg'));
    iconRegistry.addSvgIcon('user_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/account_circle-48dp.svg'));
    iconRegistry.addSvgIcon(
      'supervised_user_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/supervised_user_circle-48dp.svg'));
    iconRegistry.addSvgIcon('soundcloud-circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/soundcloud-circle.svg'));
  }

  ngOnInit(): void {
    if (TokenStorageService.getToken()) {
      const config: InjectableRxStompConfig = {
        ...rxStompConfig,
        connectHeaders: {Authorization: `Bearer ${TokenStorageService.getToken()}`}
      };
      this.rxStompService.configure(config);
      this.rxStompService.activate();
    }
  }
}
