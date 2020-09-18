import {Injectable} from '@angular/core';
import {getEndpointUrl, MUSICIAN_WANTED_AD} from '../../shared/rest-api-urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MusicianWantedAd} from '../../shared/models/musician-wanted-ad';
import {AbstractControl} from '@angular/forms';
import {UserType} from '../../shared/models/user-type';
import {RestSearchService} from './rest-search.service';
import {FormSearchService} from './form-search.service';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';

@Injectable({
  providedIn: 'root'
})
export class MusicianWantedAdService extends RestSearchService<MusicianWantedAd, number> implements FormSearchService<MusicianWantedAd> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(MUSICIAN_WANTED_AD));
  }

  static setVoivodeshipIdsIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const voivodeships = searchForm.get('wanted.voivodeships').value;

    if (voivodeships?.length) {
      httpParams = httpParams.set('voivodeshipIds', voivodeships.map(voivodeship => voivodeship.id));
    }

    return httpParams;
  }

  static setPreferredGenreIdsIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const preferredGenres = searchForm.get('wanted.genres').value;

    if (preferredGenres?.length) {
      httpParams = httpParams.set('preferredGenreIds', preferredGenres.map(genre => genre.id));
    }

    return httpParams;
  }

  static setPreferredInstrumentIdsIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const preferredInstruments = searchForm.get('wanted.instruments').value;

    if (preferredInstruments?.length) {
      httpParams = httpParams.set('preferredInstrumentIds', preferredInstruments.map(instrument => instrument.id));
    }

    return httpParams;
  }

  static setLocationIfGiven(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const location = searchForm.get('wanted.location').value;

    if (location) {
      httpParams = httpParams.set('location', location);
    }

    return httpParams;
  }

  static setLookingUserTypeIfGiven(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const musicianUser = searchForm.get('looking.musicianUser').value;
    const bandUser = searchForm.get('looking.bandUser').value;
    const regularUser = searchForm.get('looking.regularUser').value;

    if (musicianUser) {
      httpParams = httpParams.append('userType', UserType.MUSICIAN);
    }
    if (bandUser) {
      httpParams = httpParams.append('userType', UserType.BAND);
    }
    if (regularUser) {
      httpParams = httpParams.append('userType', UserType.REGULAR);
    }

    return httpParams;
  }

  static setLookingPreferredGenreIdsIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const preferredGenres = searchForm.get('looking.genres').value;

    if (preferredGenres?.length) {
      httpParams = httpParams.set('lookingPreferredGenreIds', preferredGenres.map(genre => genre.id));
    }

    return httpParams;
  }

  static setLookingPreferredInstrumentIdsIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const preferredInstruments = searchForm.get('looking.instruments').value;

    if (preferredInstruments?.length) {
      httpParams = httpParams.set('lookingPreferredInstrumentIds', preferredInstruments.map(instrument => instrument.id));
    }

    return httpParams;
  }

  private static setPreferredGenderIfSingleOneChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const male = searchForm.get('wanted.genderMale').value;
    const female = searchForm.get('wanted.genderFemale').value;

    if (male && female) {
      return httpParams;
    } else if (male) {
      httpParams = httpParams.append('preferredGender', 'M');
    } else if (female) {
      httpParams = httpParams.append('preferredGender', 'F');
    }

    return httpParams;
  }

  static setCommercialIfGiven(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const commercial = searchForm.get('looking.commercial').value;

    if (commercial) {
      httpParams = httpParams.set('commercial', commercial);
    }

    return httpParams;
  }

  searchDtosWithForm(searchForm: AbstractControl,
                     page: number,
                     pageSize: number,
                     sortFields?: string[]): Observable<Page<MusicianWantedAd>> {
    return super.searchDtos(this.searchFormToParams(searchForm), page, pageSize, sortFields);
  }

  protected searchFormToParams(searchForm: AbstractControl): HttpParams {
    let httpParams = new HttpParams()
    .set('minAge', searchForm.get('wanted.ageRange').value.min)
    .set('maxAge', searchForm.get('wanted.ageRange').value.max);

    httpParams = MusicianWantedAdService.setVoivodeshipIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setLocationIfGiven(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setPreferredGenreIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setPreferredInstrumentIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setPreferredGenderIfSingleOneChosen(searchForm, httpParams);

    httpParams = MusicianWantedAdService.setLookingUserTypeIfGiven(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setLookingPreferredGenreIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setLookingPreferredInstrumentIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setCommercialIfGiven(searchForm, httpParams);

    return httpParams;
  }
}
