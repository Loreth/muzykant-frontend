import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MusiciansComponent} from './musicians/musicians.component';
import {BandsComponent} from './bands/bands.component';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {AdDetailsComponent} from './ad-details/ad-details.component';
import {MatCardModule} from '@angular/material/card';
import {MusicianWantedAdDetailsComponent} from './ad-details/musician-wanted-ad-details/musician-wanted-ad-details.component';
import {BandWantedAdDetailsComponent} from './ad-details/band-wanted-ad-details/band-wanted-ad-details.component';
import {JamSessionAdDetailsComponent} from './ad-details/jam-session-ad-details/jam-session-ad-details.component';
import {MatChipsModule} from '@angular/material/chips';
import {SharedModule} from './shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginComponent} from './login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {TokenStorageService} from './shared/services/token-storage.service';
import {API_BASE_URL, LOGIN} from './shared/rest-api-urls';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MusiciansComponent,
    BandsComponent,
    AdDetailsComponent,
    MusicianWantedAdDetailsComponent,
    BandWantedAdDetailsComponent,
    JamSessionAdDetailsComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenStorageService.getToken,
        allowedDomains: [API_BASE_URL],
        disallowedRoutes: [API_BASE_URL + LOGIN]
      }
    }),
    MatCardModule,
    MatChipsModule,
    SharedModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatRippleModule,
    MatGridListModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
