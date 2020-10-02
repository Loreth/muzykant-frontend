import {Component, OnInit} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {TokenStorageService} from './core/services/token-storage.service';
import {rxStompConfig} from './config/rx-stomp.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'muzykant-frontend';

  constructor(private rxStompService: RxStompService) {
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
