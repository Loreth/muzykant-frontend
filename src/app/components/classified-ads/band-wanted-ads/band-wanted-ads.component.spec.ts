import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BandWantedAdsComponent} from './band-wanted-ads.component';

describe('BandWantedAdsComponent', () => {
  let component: BandWantedAdsComponent;
  let fixture: ComponentFixture<BandWantedAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BandWantedAdsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandWantedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
