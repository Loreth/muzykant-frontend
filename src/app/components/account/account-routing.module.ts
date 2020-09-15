import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {AccountBasicInfoComponent} from './account-basic-info/account-basic-info.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent, children: [
      {path: '', redirectTo: 'basic-info', pathMatch: 'full'},
      {path: 'basic-info', component: AccountBasicInfoComponent},
      {path: 'settings', component: AccountBasicInfoComponent},
      {path: 'soundcloud', component: AccountBasicInfoComponent},
      {path: 'photos', component: AccountBasicInfoComponent},
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
