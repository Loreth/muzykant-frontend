import {Injectable} from '@angular/core';
import {BAND_WANTED_AD, getEndpointUrl} from '../../shared/rest-api-urls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {BandWantedAd} from '../../shared/models/band-wanted-ad.model';
import {MusicianWantedAdService} from './musician-wanted-ad.service';
import {RestSearchService} from './rest-search.service';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/pagination/page';
import {FormSearchService} from './form-search.service';

@Injectable({
  providedIn: 'root'
})
export class BandWantedAdService extends RestSearchService<BandWantedAd, number> implements FormSearchService<BandWantedAd> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(BAND_WANTED_AD));
  }

  searchDtosWithForm(searchForm: AbstractControl,
                     page: number,
                     pageSize: number,
                     sortFields?: string[]): Observable<Page<BandWantedAd>> {
    return super.searchDtos(this.searchFormToParams(searchForm), page, pageSize, sortFields);
  }

  protected searchFormToParams(searchForm: AbstractControl): HttpParams {
    let httpParams = new HttpParams();

    httpParams = MusicianWantedAdService.setVoivodeshipIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setLocationIfGiven(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setPreferredGenreIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setPreferredInstrumentIdsIfChosen(searchForm, httpParams);

    httpParams = MusicianWantedAdService.setLookingUserTypeIfGiven(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setLookingPreferredGenreIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setLookingPreferredInstrumentIdsIfChosen(searchForm, httpParams);
    httpParams = MusicianWantedAdService.setCommercialIfGiven(searchForm, httpParams);

    return httpParams;
  }
}
