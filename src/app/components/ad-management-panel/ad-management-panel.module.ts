import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdManagementPanelRoutingModule} from './ad-management-panel-routing.module';
import {AdManagementPanelComponent} from './ad-management-panel.component';
import {ClassifiedAdsModule} from '../classified-ads/classified-ads.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {AdFormComponent} from './ad-form/ad-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {UserAdListComponent} from './user-ad-list/user-ad-list.component';

@NgModule({
  declarations: [AdManagementPanelComponent, AdFormComponent, UserAdListComponent],
  imports: [
    CommonModule,
    AdManagementPanelRoutingModule,
    ClassifiedAdsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    TextFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ]
})
export class AdManagementPanelModule {
}
