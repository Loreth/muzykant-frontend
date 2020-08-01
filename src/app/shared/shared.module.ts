import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [CapitalizePipe],
  exports: [
    CapitalizePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
