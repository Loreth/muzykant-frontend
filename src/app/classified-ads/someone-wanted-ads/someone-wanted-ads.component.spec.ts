import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SomeoneWantedAdsComponent} from './someone-wanted-ads.component';

describe('SomeoneWantedAdsComponent', () => {
  let component: SomeoneWantedAdsComponent;
  let fixture: ComponentFixture<SomeoneWantedAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SomeoneWantedAdsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeoneWantedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
