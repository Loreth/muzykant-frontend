import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JamSessionAdsComponent} from './jam-session-ads.component';

describe('JamSessionAdsComponent', () => {
  let component: JamSessionAdsComponent;
  let fixture: ComponentFixture<JamSessionAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JamSessionAdsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamSessionAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
