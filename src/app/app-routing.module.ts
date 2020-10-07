import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BandsComponent} from './components/user-search/bands/bands.component';
import {MusiciansComponent} from './components/user-search/musicians/musicians.component';
import {MusicianWantedAdDetailsComponent} from './components/ad-details/musician-wanted-ad-details/musician-wanted-ad-details.component';
import {BandWantedAdDetailsComponent} from './components/ad-details/band-wanted-ad-details/band-wanted-ad-details.component';
import {JamSessionAdDetailsComponent} from './components/ad-details/jam-session-ad-details/jam-session-ad-details.component';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {ConfirmEmailComponent} from './components/confirm-email/confirm-email.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {AuthGuard} from './core/guards/auth.guard';
import {AlreadyLoggedGuard} from './core/guards/already-logged.guard';
import {ChatComponent} from './components/chat/chat.component';

const routes: Routes = [
  {path: '', redirectTo: 'ads', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AlreadyLoggedGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate: [AlreadyLoggedGuard]},
  {path: 'confirm-email', component: ConfirmEmailComponent, canActivate: [AlreadyLoggedGuard]},
  {path: 'create-user', component: CreateUserComponent, canDeactivate: [AuthGuard]},
  {path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule)},
  {path: 'ads', loadChildren: () => import('./components/classified-ads/classified-ads.module').then(m => m.ClassifiedAdsModule)},
  {path: 'musicians', component: MusiciansComponent},
  {path: 'bands', component: BandsComponent},
  {path: 'messages', component: ChatComponent, canActivate: [AuthGuard]},
  {
    path: 'my-ads',
    loadChildren: () => import('./components/ad-management-panel/ad-management-panel.module').then(m => m.AdManagementPanelModule)
  },
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
