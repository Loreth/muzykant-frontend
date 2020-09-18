import {Component, forwardRef} from '@angular/core';
import {ChipListAutocompleteInputComponent} from '../chip-list-autocomplete-input/chip-list-autocomplete-input.component';
import {Instrument} from '../../../../shared/models/instrument';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {InstrumentService} from '../../../../core/services/instrument.service';
import {ChipCssClass} from '../../../../shared/models/ad-chip';

@Component({
  selector: 'app-instrument-chip-input',
  templateUrl: '../chip-list-autocomplete-input/chip-list-autocomplete-input.component.html',
  styleUrls: ['../chip-list-autocomplete-input/chip-list-autocomplete-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InstrumentChipInputComponent),
      multi: true
    }
  ]
})
export class InstrumentChipInputComponent extends ChipListAutocompleteInputComponent<number, Instrument> {
  label = 'Instrumenty';
  labelIcon = 'mic';
  placeholder = 'Dodaj instrument';
  chipCssClass = ChipCssClass.INSTRUMENT;

  constructor(instrumentService: InstrumentService) {
    super(instrumentService);
  }
}
