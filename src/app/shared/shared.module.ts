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

@NgModule({
  declarations: [CapitalizePipe,
    MaterialElevationDirective,
    MatRangeSliderComponent,
    PersonFormComponent,
    UserFormComponent],
  exports: [
    CapitalizePipe,
    MaterialElevationDirective,
    MatRangeSliderComponent,
    PersonFormComponent,
    UserFormComponent
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
    MatSelectModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule {
}
