import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdFilterPanelComponent} from './ad-filter-panel.component';

describe('AdFilterPanelComponent', () => {
  let component: AdFilterPanelComponent;
  let fixture: ComponentFixture<AdFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdFilterPanelComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
