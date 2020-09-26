import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClassifiedAdsRoutingModule} from './classified-ads-routing.module';
import {ClassifiedAdsComponent} from './classified-ads.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../../shared/shared.module';
import {SomeoneWantedAdsComponent} from './someone-wanted-ads/someone-wanted-ads.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {AdFilterPanelComponent} from './ad-filter-panel/ad-filter-panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';
import {AdsWithFilterPanelComponent} from './ads-with-filter-panel/ads-with-filter-panel.component';

@NgModule({
  declarations: [
    ClassifiedAdsComponent,
    SomeoneWantedAdsComponent,
    AdFilterPanelComponent,
    AdsWithFilterPanelComponent,
  ],
  imports: [
    CommonModule,
    ClassifiedAdsRoutingModule,
    FlexLayoutModule,
    MatTabsModule,
    MatListModule,
    SharedModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    OverlayscrollbarsModule
  ]
})
export class ClassifiedAdsModule {
}
