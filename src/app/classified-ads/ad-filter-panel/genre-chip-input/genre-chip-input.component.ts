import {Component} from '@angular/core';
import {ChipListAutocompleteInputComponent} from '../chip-list-autocomplete-input/chip-list-autocomplete-input.component';
import {Genre} from '../../../shared/models/genre.model';

@Component({
  selector: 'app-genre-chip-input',
  templateUrl: '../chip-list-autocomplete-input/chip-list-autocomplete-input.component.html',
  styleUrls: ['../chip-list-autocomplete-input/chip-list-autocomplete-input.component.css']
})
export class GenreChipInputComponent extends ChipListAutocompleteInputComponent<number, Genre> {
  label = 'Gatunki';
  labelIcon = 'music_note';
  placeholder = 'Dodaj gatunek';
  chipCssClass = 'genre-chip';
  items = [
    {
      id: 13,
      name: 'Alternatywa'
    },
    {
      id: 15,
      name: 'Blues'
    },
    {
      id: 16,
      name: 'Celtic'
    },
    {
      id: 18,
      name: 'Country'
    },
    {
      id: 34,
      name: 'Death Metal'
    },
    {
      id: 19,
      name: 'Disco Polo'
    },
    {
      id: 20,
      name: 'Djent'
    },
    {
      id: 21,
      name: 'Dubstep'
    },
    {
      id: 7,
      name: 'EDM'
    },
    {
      id: 22,
      name: 'Elektronika'
    },
    {
      id: 10,
      name: 'Grunge'
    },
    {
      id: 24,
      name: 'Hard Rock'
    }];

  constructor() {
    super();
  }
}
