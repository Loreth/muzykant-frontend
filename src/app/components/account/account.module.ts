import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import {AccountBasicInfoComponent} from './account-basic-info/account-basic-info.component';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MusicianBasicInfoComponent} from './account-basic-info/musician-basic-info/musician-basic-info.component';
import {BandBasicInfoComponent} from './account-basic-info/band-basic-info/band-basic-info.component';
import {RegularUserBasicInfoComponent} from './account-basic-info/regular-user-basic-info/regular-user-basic-info.component';


@NgModule({
  declarations: [
    AccountComponent,
    AccountBasicInfoComponent,
    MusicianBasicInfoComponent,
    BandBasicInfoComponent,
    RegularUserBasicInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatListModule,
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class AccountModule {
}
