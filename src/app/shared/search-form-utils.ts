import {HttpParams} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';

export function userSearchFormToHttpParams(searchForm: AbstractControl): HttpParams {
  let httpParams = new HttpParams();
  const searchFormValue = searchForm.value;
  Object.keys(searchFormValue).forEach(param => {
    if (searchFormValue[param]) {
      if (searchFormValue[param] instanceof Array && searchFormValue[param]?.length === 0) {
        return;
      }

      switch (param) {
        case 'voivodeships':
          httpParams = httpParams.set(
            'voivodeshipIds', searchFormValue[param].map(voivodeship => voivodeship.id).join(','));
          break;
        case 'city':
          httpParams = httpParams.set(param, searchFormValue[param]);
          break;
        case 'name':
          httpParams = httpParams.set(param, searchFormValue[param]);
          break;
        case 'genderMale':
          httpParams = httpParams.append('gender', 'M');
          break;
        case 'genderFemale':
          httpParams = httpParams.append('gender', 'F');
          break;
        case 'ageRange':
          const birthdateAfter = moment().subtract(searchFormValue[param].max + 1, 'years').format('YYYY-MM-DD');
          const birthdateBefore = moment().subtract(searchFormValue[param].min, 'years').format('YYYY-MM-DD');
          httpParams = httpParams.set('birthdateAfterInclusive', birthdateAfter.toString());
          httpParams = httpParams.set('birthdateBeforeInclusive', birthdateBefore.toString());
          break;
        case 'formationYear':
          httpParams = httpParams.set('birthdateAfterInclusive', searchFormValue[param].min);
          httpParams = httpParams.set('birthdateBeforeInclusive', searchFormValue[param].max);
          break;
        case 'genres':
          httpParams = httpParams.set(
            'genreIds', searchFormValue[param].map(genre => genre.id).join(','));
          break;
        case 'instruments':
          httpParams = httpParams.set(
            'instrumentIds', searchFormValue[param].map(instrument => instrument.id).join(','));
          break;
      }
    }
  });

  return httpParams;
}
