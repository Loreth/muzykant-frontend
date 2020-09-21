import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {Nameable} from '../../models/nameable';

@Component({
  selector: 'app-chip-autocomplete-input',
  templateUrl: './chip-autocomplete-input.component.html',
  styleUrls: ['./chip-autocomplete-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipAutocompleteInputComponent),
      multi: true
    }
  ]
})
export class ChipAutocompleteInputComponent implements OnInit, ControlValueAccessor {
  @Input() items$: Observable<Nameable<any>[]>;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() labelIcon: string;
  @Input() labelIconClass: string;
  @Input() chipCssClass: string;
  @Input() chipsUnderInput = false;

  inputFormControl = new FormControl();
  items: Nameable<any>[];
  filteredItems: Observable<Nameable<any>[]>;
  selectedItems: Nameable<any>[] = [];

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

  constructor() {
  }

  ngOnInit(): void {
    this.items$.subscribe(items => {
      this.items = items;
      this.filteredItems = this.inputFormControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterItems(name) : this.items));
    });
  }

  remove(item: Nameable<any>): void {
    const index = this.selectedItems.indexOf(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    this.propagateChange(this.selectedItems);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const viewValue = event.option.value;

    if (!this.selectedItems.map(item => item.id).includes(viewValue.id)) {
      this.selectedItems.push(viewValue);
    }
    this.inputFormControl.setValue('');
    this.itemInput.nativeElement.value = '';
    this.propagateChange(this.selectedItems);
  }

  private _filterItems(name: string): Nameable<any>[] {
    const filterValue = name.toLowerCase();

    return this.items.filter(item => item.name.toLowerCase().includes(filterValue));
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Nameable<any>[]): void {
    if (obj !== null && obj !== undefined) {
      this.selectedItems = obj;
    }
  }
}
