import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {MaterialElevationDirective} from './directives/material-elevation.directive';

@NgModule({
  declarations: [CapitalizePipe, MaterialElevationDirective],
  exports: [
    CapitalizePipe,
    MaterialElevationDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
