import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// @ts-ignore
import OverlayScrollbars from 'overlayscrollbars';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));

OverlayScrollbars(document.body, {
  paddingAbsolute: true,
  scrollbars: {
    autoHide: 'never'
  },
  nativeScrollbarsOverlaid: {
    initialize: false
  }
});
