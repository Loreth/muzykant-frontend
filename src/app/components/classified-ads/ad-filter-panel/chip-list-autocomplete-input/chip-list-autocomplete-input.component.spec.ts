import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChipListAutocompleteInputComponent} from './chip-list-autocomplete-input.component';

describe('ChipListAutocompleteInputComponent', () => {
  let component: ChipListAutocompleteInputComponent;
  let fixture: ComponentFixture<ChipListAutocompleteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipListAutocompleteInputComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
