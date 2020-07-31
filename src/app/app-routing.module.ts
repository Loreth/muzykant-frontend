import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BandsComponent} from './bands/bands.component';
import {MusiciansComponent} from './musicians/musicians.component';

const routes: Routes = [
  {path: '', redirectTo: 'ads', pathMatch: 'full'},
  {path: 'ads', loadChildren: () => import('./classified-ads/classified-ads.module').then(m => m.ClassifiedAdsModule)},
  {path: 'musicians', component: MusiciansComponent},
  {path: 'bands', component: BandsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
