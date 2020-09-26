import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassifiedAdsComponent} from './classified-ads.component';
import {AdType} from '../../shared/models/ad-type';
import {AdsWithFilterPanelComponent} from './ads-with-filter-panel/ads-with-filter-panel.component';

const routes: Routes = [
  {
    path: '', component: ClassifiedAdsComponent, children: [
      {path: '', redirectTo: 'musician-wanted', pathMatch: 'full'},
      {path: 'musician-wanted', component: AdsWithFilterPanelComponent, data: {adType: AdType.MUSICIAN_WANTED}},
      {path: 'band-wanted', component: AdsWithFilterPanelComponent, data: {adType: AdType.BAND_WANTED}},
      {path: 'jam-session', component: AdsWithFilterPanelComponent, data: {adType: AdType.JAM_SESSION}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedAdsRoutingModule {
}
