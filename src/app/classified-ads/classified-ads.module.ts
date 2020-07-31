import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClassifiedAdsRoutingModule} from './classified-ads-routing.module';
import {MusicianWantedAdsComponent} from './musician-wanted-ads/musician-wanted-ads.component';
import {BandWantedAdsComponent} from './band-wanted-ads/band-wanted-ads.component';
import {JamSessionAdsComponent} from './jam-session-ads/jam-session-ads.component';
import {ClassifiedAdsComponent} from './classified-ads.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../shared/shared.module';
import {SomeoneWantedAdsComponent} from './someone-wanted-ads/someone-wanted-ads.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ClassifiedAdsComponent,
    BandWantedAdsComponent,
    MusicianWantedAdsComponent,
    JamSessionAdsComponent,
    SomeoneWantedAdsComponent
  ],
  imports: [
    CommonModule,
    ClassifiedAdsRoutingModule,
    FlexLayoutModule,
    MatTabsModule,
    MatListModule,
    SharedModule,
    MatIconModule
  ]
})
export class ClassifiedAdsModule {
}
