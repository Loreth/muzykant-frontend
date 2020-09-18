import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {AccountBasicInfoComponent} from './account-basic-info/account-basic-info.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {AccountSocialMediaLinksComponent} from './account-social-media-links/account-social-media-links.component';
import {AccountPhotosComponent} from './account-photos/account-photos.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent, children: [
      {path: '', redirectTo: 'basic-info', pathMatch: 'full'},
      {path: 'basic-info', component: AccountBasicInfoComponent},
      {path: 'details', component: AccountDetailsComponent},
      {path: 'settings', component: AccountSettingsComponent},
      {path: 'social-media', component: AccountSocialMediaLinksComponent},
      {path: 'photos', component: AccountPhotosComponent},
      {path: 'messages', component: AccountBasicInfoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
