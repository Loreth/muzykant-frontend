import {Injectable} from '@angular/core';
import {MusicianService} from './musician.service';
import {RestService} from './rest.service';
import {User} from '../../shared/models/user';
import {UserType} from '../../shared/models/UserType';
import {BandService} from './band.service';
import {RegularUserService} from './regular-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceFactoryService {

  constructor(private musicianService: MusicianService,
              private bandService: BandService,
              private regularUserService: RegularUserService) {
  }

  getUserService(userType: UserType): RestService<User, number> {
    switch (userType) {
      case UserType.MUSICIAN:
        return this.musicianService;
      case UserType.BAND:
        return this.bandService;
      case UserType.REGULAR:
        return this.regularUserService;
    }
  }
}
