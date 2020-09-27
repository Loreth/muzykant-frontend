import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdManagementPanelComponent} from './ad-management-panel.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {AdFormComponent} from './ad-form/ad-form.component';

const routes: Routes = [
  {path: '', component: AdManagementPanelComponent, canActivate: [AuthGuard]},
  {path: 'new-ad', component: AdFormComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: AdFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdManagementPanelRoutingModule {
}
