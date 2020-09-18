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

@NgModule({
  declarations: [CapitalizePipe,
    MaterialElevationDirective,
    MatRangeSliderComponent,
    PersonFormComponent,
    UserFormComponent,
    ChipAutocompleteInputComponent,
    SoundcloudWidgetComponent],
  exports: [
    CapitalizePipe,
    MaterialElevationDirective,
    MatRangeSliderComponent,
    PersonFormComponent,
    UserFormComponent,
    ChipAutocompleteInputComponent,
    SoundcloudWidgetComponent
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
    MatChipsModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule {
}
