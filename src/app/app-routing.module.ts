import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BandsComponent} from './bands/bands.component';
import {MusiciansComponent} from './musicians/musicians.component';
import {MusicianWantedAdDetailsComponent} from './ad-details/musician-wanted-ad-details/musician-wanted-ad-details.component';
import {BandWantedAdDetailsComponent} from './ad-details/band-wanted-ad-details/band-wanted-ad-details.component';
import {JamSessionAdDetailsComponent} from './ad-details/jam-session-ad-details/jam-session-ad-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'ads', pathMatch: 'full'},
  {path: 'ads', loadChildren: () => import('./classified-ads/classified-ads.module').then(m => m.ClassifiedAdsModule)},
  {path: 'musicians', component: MusiciansComponent},
  {path: 'bands', component: BandsComponent},
  {path: 'ads/musician-wanted/:id', component: MusicianWantedAdDetailsComponent},
  {path: 'ads/band-wanted/:id', component: BandWantedAdDetailsComponent},
  {path: 'ads/jam-session/:id', component: JamSessionAdDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
