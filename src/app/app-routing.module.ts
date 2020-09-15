import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BandsComponent} from './components/bands/bands.component';
import {MusiciansComponent} from './components/musicians/musicians.component';
import {MusicianWantedAdDetailsComponent} from './components/ad-details/musician-wanted-ad-details/musician-wanted-ad-details.component';
import {BandWantedAdDetailsComponent} from './components/ad-details/band-wanted-ad-details/band-wanted-ad-details.component';
import {JamSessionAdDetailsComponent} from './components/ad-details/jam-session-ad-details/jam-session-ad-details.component';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {ConfirmEmailComponent} from './components/confirm-email/confirm-email.component';
import {CreateUserComponent} from './components/create-user/create-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'ads', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'confirm-email', component: ConfirmEmailComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule)},
  {path: 'ads', loadChildren: () => import('./components/classified-ads/classified-ads.module').then(m => m.ClassifiedAdsModule)},
  {path: 'musicians', component: MusiciansComponent},
  {path: 'bands', component: BandsComponent},
  {path: 'ads/musician-wanted/:id', component: MusicianWantedAdDetailsComponent},
  {path: 'ads/band-wanted/:id', component: BandWantedAdDetailsComponent},
  {path: 'ads/jam-session/:id', component: JamSessionAdDetailsComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
