import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {MaterialElevationDirective} from './directives/material-elevation.directive';
import {MatRangeSliderComponent} from './components/mat-range-slider/mat-range-slider.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {UserFormComponent} from './components/user-form/user-form.component';
import {MatSelectModule} from '@angular/material/select';
import {ChipAutocompleteInputComponent} from './components/chip-autocomplete-input/chip-autocomplete-input.component';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {SoundcloudWidgetComponent} from './components/soundcloud-widget/soundcloud-widget.component';
import {UserCardComponent} from './components/user-card/user-card.component';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UserCardMiniComponent} from './components/user-card-mini/user-card-mini.component';
import {RouterModule} from '@angular/router';
import {ImageCropDialogComponent} from './components/image-crop-dialog/image-crop-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [CapitalizePipe,
    MaterialElevationDirective,
    MatRangeSliderComponent,
    PersonFormComponent,
    UserFormComponent,
    ChipAutocompleteInputComponent,
    SoundcloudWidgetComponent,
    UserCardComponent,
    UserCardMiniComponent,
    ImageCropDialogComponent],
  exports: [
    CapitalizePipe,
    MaterialElevationDirective,
    MatRangeSliderComponent,
    PersonFormComponent,
    UserFormComponent,
    ChipAutocompleteInputComponent,
    SoundcloudWidgetComponent,
    UserCardComponent,
    UserCardMiniComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    MatDialogModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule {
}
