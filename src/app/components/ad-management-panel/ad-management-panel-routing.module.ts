import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdManagementPanelComponent} from './ad-management-panel.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: AdManagementPanelComponent,
    canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {path: 'add', component: AdManagementPanelComponent},
      {path: 'edit', component: AdManagementPanelComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdManagementPanelRoutingModule {
}
