import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MusicianWantedAdsComponent} from './musician-wanted-ads/musician-wanted-ads.component';
import {JamSessionAdsComponent} from './jam-session-ads/jam-session-ads.component';
import {BandWantedAdsComponent} from './band-wanted-ads/band-wanted-ads.component';
import {ClassifiedAdsComponent} from './classified-ads.component';

const routes: Routes = [
  {
    path: '', component: ClassifiedAdsComponent, children: [
      {path: '', redirectTo: 'musician-wanted', pathMatch: 'full'},
      {path: 'musician-wanted', component: MusicianWantedAdsComponent},
      {path: 'band-wanted', component: BandWantedAdsComponent},
      {path: 'jam-session', component: JamSessionAdsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedAdsRoutingModule {
}
