import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {Nameable} from '../../../../shared/models/nameable';
import {RestService} from '../../../../core/services/rest.service';

@Component({
  templateUrl: './chip-list-autocomplete-input.component.html',
  styleUrls: ['./chip-list-autocomplete-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipListAutocompleteInputComponent),
      multi: true
    }
  ]
})
export class ChipListAutocompleteInputComponent<ID, T extends Nameable<ID>> implements ControlValueAccessor, OnInit {
  items: T[];
  @Input() placeholder: string;
  @Input() label: string;
  @Input() labelIcon: string;
  @Input() chipCssClass: string;

  inputFormControl = new FormControl();
  filteredItems: Observable<T[]>;
  selectedItems: T[] = [];

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('trigger', {read: MatAutocompleteTrigger}) matAutocompleteTrigger: MatAutocompleteTrigger;

  constructor(private service: RestService<T, ID>) {
  }

  ngOnInit(): void {
    this.service.getDtosPage(0, 2000, ['name']).subscribe(
      page => {
        this.items = page.content;

        this.filteredItems = this.inputFormControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterItems(name) : this.items));
      }
    );
  }

  remove(item: T): void {
    const index = this.selectedItems.indexOf(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    this.propagateChange(this.selectedItems);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const viewValue = event.option.value;

    if (!this.selectedItems.includes(viewValue)) {
      this.selectedItems.push(viewValue);
    }
    this.itemInput.nativeElement.value = '';
    this.inputFormControl.setValue('');
    this.propagateChange(this.selectedItems);
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

  propagateChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: T[]): void {
    if (obj !== null && obj !== undefined) {
      this.selectedItems = obj;
    }
  }
}
