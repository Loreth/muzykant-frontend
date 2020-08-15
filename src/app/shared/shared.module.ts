import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {MaterialElevationDirective} from './directives/material-elevation.directive';
import { MatRangeSliderComponent } from './components/mat-range-slider/mat-range-slider.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [CapitalizePipe, MaterialElevationDirective, MatRangeSliderComponent],
  exports: [
    CapitalizePipe,
    MaterialElevationDirective,
    MatRangeSliderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule
  ]
})
export class SharedModule {
}
