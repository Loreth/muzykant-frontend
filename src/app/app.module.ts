import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MusiciansComponent} from './components/user-search/musicians/musicians.component';
import {BandsComponent} from './components/user-search/bands/bands.component';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AdDetailsComponent} from './components/ad-details/ad-details.component';
import {MatCardModule} from '@angular/material/card';
import {MusicianWantedAdDetailsComponent} from './components/ad-details/musician-wanted-ad-details/musician-wanted-ad-details.component';
import {BandWantedAdDetailsComponent} from './components/ad-details/band-wanted-ad-details/band-wanted-ad-details.component';
import {JamSessionAdDetailsComponent} from './components/ad-details/jam-session-ad-details/jam-session-ad-details.component';
import {MatChipsModule} from '@angular/material/chips';
import {SharedModule} from './shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginComponent} from './components/login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {TokenStorageService} from './core/services/token-storage.service';
import {LOGIN} from './shared/rest-api-urls';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule} from '@angular/material/core';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ConfirmEmailComponent} from './components/confirm-email/confirm-email.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {CreateMusicianComponent} from './components/create-user/create-musician/create-musician.component';
import {CreateBandComponent} from './components/create-user/create-band/create-band.component';
import {CreateRegularUserComponent} from './components/create-user/create-regular-user/create-regular-user.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {SortablejsModule} from 'ngx-sortablejs';
import {UsersComponent} from './components/users/users.component';
import {UserSearchFilterPanelComponent} from './components/user-search/user-search-filter-panel/user-search-filter-panel.component';
import {UserSearchResultsComponent} from './components/user-search/user-search-results/user-search-results.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';
import {ErrorInterceptor} from './core/interceptors/error-interceptor';
import {environment} from '../environments/environment';
import {ClassifiedAdsModule} from './components/classified-ads/classified-ads.module';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginatorIntlPolish} from './shared/localization/MatPaginatorIntlPolish';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ChatComponent} from './components/chat/chat.component';
import {UserConversationsComponent} from './components/chat/user-conversations/user-conversations.component';
import {ConversationComponent} from './components/chat/conversation/conversation.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgImageSliderModule} from 'ng-image-slider';
import {MatBadgeModule} from '@angular/material/badge';
import localePl from '@angular/common/locales/pl';
import {registerLocaleData} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

registerLocaleData(localePl);

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
    SignUpComponent,
    ConfirmEmailComponent,
    PageNotFoundComponent,
    CreateUserComponent,
    CreateMusicianComponent,
    CreateBandComponent,
    CreateRegularUserComponent,
    UsersComponent,
    UserSearchFilterPanelComponent,
    UserSearchResultsComponent,
    ChatComponent,
    UserConversationsComponent,
    ConversationComponent
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
        allowedDomains: [environment.apiDomain],
        disallowedRoutes: [environment.apiUrl + LOGIN]
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
    MatSnackBarModule,
    MatMomentDateModule,
    SortablejsModule.forRoot({animation: 200, easing: 'cubic-bezier(0, 0, 0.2, 1)'}),
    MatCheckboxModule,
    OverlayscrollbarsModule,
    ClassifiedAdsModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    NgImageSliderModule,
    MatBadgeModule,
    MatExpansionModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlPolish},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: LOCALE_ID, useValue: 'pl-PL'},
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: ['L', 'LL'],
        },
        display: {
          dateInput: 'D.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
    RxStompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
