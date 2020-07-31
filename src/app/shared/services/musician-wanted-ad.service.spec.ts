import {TestBed} from '@angular/core/testing';

import {MusicianWantedAdService} from './musician-wanted-ad.service';

describe('MusicianWantedAdService', () => {
  let service: MusicianWantedAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicianWantedAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
