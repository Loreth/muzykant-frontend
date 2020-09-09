import {Component, forwardRef} from '@angular/core';
import {ChipListAutocompleteInputComponent} from '../chip-list-autocomplete-input/chip-list-autocomplete-input.component';
import {Genre} from '../../../../shared/models/genre.model';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {GenreService} from '../../../../core/services/genre.service';
import {ChipCssClass} from '../../../../shared/models/ad-chip';

@Component({
  selector: 'app-genre-chip-input',
  templateUrl: '../chip-list-autocomplete-input/chip-list-autocomplete-input.component.html',
  styleUrls: ['../chip-list-autocomplete-input/chip-list-autocomplete-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenreChipInputComponent),
      multi: true
    }
  ]
})
export class GenreChipInputComponent extends ChipListAutocompleteInputComponent<number, Genre> {
  label = 'Gatunki';
  labelIcon = 'music_note';
  placeholder = 'Dodaj gatunek';
  chipCssClass = ChipCssClass.GENRE;

  constructor(genreService: GenreService) {
    super(genreService);
  }
}
