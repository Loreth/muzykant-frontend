import {Component} from '@angular/core';
import {ChipListAutocompleteInputComponent} from '../chip-list-autocomplete-input/chip-list-autocomplete-input.component';
import {Instrument} from '../../../shared/models/instrument.model';

@Component({
  selector: 'app-instrument-chip-input',
  templateUrl: '../chip-list-autocomplete-input/chip-list-autocomplete-input.component.html',
  styleUrls: ['../chip-list-autocomplete-input/chip-list-autocomplete-input.component.css']
})
export class InstrumentChipInputComponent extends ChipListAutocompleteInputComponent<number, Instrument> {
  label = 'Instrumenty';
  labelIcon = 'mic';
  placeholder = 'Dodaj instrument';
  chipCssClass = 'instrument-chip';
  items = [
    {
      id: 1,
      name: 'Akordeon'
    },
    {
      id: 2,
      name: 'Altówka'
    },
    {
      id: 3,
      name: 'Banjo'
    },
    {
      id: 4,
      name: 'Bas'
    },
    {
      id: 5,
      name: 'Bongosy'
    },
    {
      id: 6,
      name: 'Cymbały'
    },
    {
      id: 7,
      name: 'DAW'
    },
    {
      id: 8,
      name: 'DJ'
    },
    {
      id: 9,
      name: 'Dudy'
    },
    {
      id: 10,
      name: 'Flet'
    },
    {
      id: 48,
      name: 'Flet poprzeczny'
    },
    {
      id: 11,
      name: 'Fortepian'
    },
    {
      id: 46,
      name: 'Gitara akustyczna'
    },
    {
      id: 45,
      name: 'Gitara elektryczna'
    },
    {
      id: 47,
      name: 'Gitara klasyczna'
    },
    {
      id: 12,
      name: 'Harfa'
    },
    {
      id: 13,
      name: 'Harmonijka'
    },
    {
      id: 14,
      name: 'Kitara'
    },
    {
      id: 15,
      name: 'Klarnet'
    },
    {
      id: 16,
      name: 'Klawesyn'
    }];

  constructor() {
    super();
  }
}
