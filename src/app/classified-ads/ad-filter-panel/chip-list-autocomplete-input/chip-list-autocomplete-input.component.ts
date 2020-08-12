import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {Nameable} from '../../../shared/models/nameable.model';

@Component({
  templateUrl: './chip-list-autocomplete-input.component.html',
  styleUrls: ['./chip-list-autocomplete-input.component.css']
})
export class ChipListAutocompleteInputComponent<ID, T extends Nameable<ID>> {
  @Input() items: T[];
  @Input() placeholder: string;
  @Input() label: string;
  @Input() labelIcon: string;
  @Input() chipCssClass: string;

  formControl = new FormControl();
  filteredItems: Observable<T[]>;
  selectedItems: T[] = [];

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('trigger', {read: MatAutocompleteTrigger}) matAutocompleteTrigger: MatAutocompleteTrigger;

  constructor() {
    this.filteredItems = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterItems(name) : this.items.slice()));
  }

  remove(item: T): void {
    const index = this.selectedItems.indexOf(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const viewValue = event.option.value;

    if (!this.selectedItems.includes(viewValue)) {
      this.selectedItems.push(viewValue);
    }
    this.itemInput.nativeElement.value = '';
    this.formControl.setValue('');
  }

  private _filterItems(name: string): T[] {
    const filterValue = name.toLowerCase();

    return this.items.filter(item => item.name.toLowerCase().includes(filterValue));
  }

  public onBackspaceKeydownHideAutocomplete(): void {
    if (!this.itemInput || this.itemInput.nativeElement.value === '') {
      this.matAutocompleteTrigger.closePanel();
    }
  }
}
