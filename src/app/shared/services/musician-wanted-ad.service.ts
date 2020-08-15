import {Injectable} from '@angular/core';
import {getEndpointUrl, MUSICIAN_WANTED_AD} from '../RestApiUrls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RestService} from './rest.service';
import {MusicianWantedAd} from '../models/musician-wanted-ad.model';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MusicianWantedAdService extends RestService<MusicianWantedAd, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(MUSICIAN_WANTED_AD));
  }

  private setPreferredGenderIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const male = searchForm.get('wanted.genderMale').value;
    const female = searchForm.get('wanted.genderFemale').value;

    if (male && female) {
      return httpParams;
    } else if (male) {
      httpParams = httpParams.append('preferredGender', 'M');
    } else if (female) {
      httpParams = httpParams.append('preferredGender', 'K');
    }

    return httpParams;
  }

  private setPreferredGenreIdsIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const preferredGenres = searchForm.get('wanted.genres').value;

    if (preferredGenres?.length) {
      httpParams = httpParams.set('preferredGenreIds', preferredGenres.map(genre => genre.id));
    }

    return httpParams;
  }

  private setPreferredInstrumentIdsIfChosen(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const preferredInstruments = searchForm.get('wanted.instruments').value;

    if (preferredInstruments?.length) {
      httpParams = httpParams.set('preferredInstrumentIds', preferredInstruments.map(instrument => instrument.id));
    }

    return httpParams;
  }

  private setLocationIfGiven(searchForm: AbstractControl, httpParams: HttpParams): HttpParams {
    const location = searchForm.get('wanted.location').value;

    if (location) {
      httpParams = httpParams.set('location', location);
    }

    return httpParams;
  }

  protected searchFormToParams(searchForm: AbstractControl): HttpParams {
    let httpParams = new HttpParams()
    .set('minAge', searchForm.get('wanted.ageRange').value.min)
    .set('maxAge', searchForm.get('wanted.ageRange').value.max);

    httpParams = this.setLocationIfGiven(searchForm, httpParams);
    httpParams = this.setPreferredGenreIdsIfChosen(searchForm, httpParams);
    httpParams = this.setPreferredInstrumentIdsIfChosen(searchForm, httpParams);
    httpParams = this.setPreferredGenderIfChosen(searchForm, httpParams);
    // .set('commercial', searchForm.get('looking.commercial').value)
    // .set('location', searchForm.get('wanted.location').value);

    return httpParams;
  }
}
