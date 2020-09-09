import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MusicianWantedAdsComponent} from './musician-wanted-ads.component';

describe('MusicianWantedAdsComponent', () => {
  let component: MusicianWantedAdsComponent;
  let fixture: ComponentFixture<MusicianWantedAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MusicianWantedAdsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianWantedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
