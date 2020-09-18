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
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {AccountSocialMediaLinksComponent} from './account-social-media-links/account-social-media-links.component';
import {AccountPhotosComponent} from './account-photos/account-photos.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {SortablejsModule} from 'ngx-sortablejs';

@NgModule({
  declarations: [
    AccountComponent,
    AccountBasicInfoComponent,
    MusicianBasicInfoComponent,
    BandBasicInfoComponent,
    RegularUserBasicInfoComponent,
    AccountDetailsComponent,
    AccountSettingsComponent,
    AccountSocialMediaLinksComponent,
    AccountPhotosComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatListModule,
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxFileDropModule,
    SortablejsModule
  ]
})
export class AccountModule {
}
