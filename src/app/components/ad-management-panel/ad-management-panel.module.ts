import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdManagementPanelRoutingModule} from './ad-management-panel-routing.module';
import {AdManagementPanelComponent} from './ad-management-panel.component';
import {ClassifiedAdsModule} from '../classified-ads/classified-ads.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [AdManagementPanelComponent],
  imports: [
    CommonModule,
    AdManagementPanelRoutingModule,
    ClassifiedAdsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ]
})
export class AdManagementPanelModule {
}
