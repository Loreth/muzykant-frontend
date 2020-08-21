import {Injectable} from '@angular/core';
import {getEndpointUrl, JAM_SESSION_AD} from '../RestApiUrls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {MusicianWantedAdService} from './musician-wanted-ad.service';
import {JamSessionAd} from '../models/jam-session-ad.model';
import {RestSearchService} from './rest-search.service';
import {FormSearchService} from './form-search.service';
import {Observable} from 'rxjs';
import {Page} from '../models/pagination/page';

@Injectable({
  providedIn: 'root'
})
export class JamSessionAdService extends RestSearchService<JamSessionAd, number> implements FormSearchService<JamSessionAd> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(JAM_SESSION_AD));
  }

  searchDtosWithForm(searchForm: AbstractControl,
                     page: number,
                     pageSize: number,
                     sortFields?: string[]): Observable<Page<JamSessionAd>> {
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
