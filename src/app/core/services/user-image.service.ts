import {Injectable} from '@angular/core';
import {getEndpointUrl, USER_IMAGE, USER_IMAGE_UPLOAD} from '../../shared/rest-api-urls';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RestSearchService} from './rest-search.service';
import {UserImage} from '../../shared/models/user-image';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserImageService extends RestSearchService<UserImage, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, getEndpointUrl(USER_IMAGE));
  }

  upload(image: File, userId: number, orderIndex: number, profileImage = false): Observable<HttpResponse<UserImage>> {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('userId', userId.toString());
    formData.append('orderIndex', orderIndex.toString());
    formData.append('profileImage', profileImage ? 'true' : 'false');
    console.log('uploading image w\ orderIndex=' + orderIndex);

    return this.http.post<any>(getEndpointUrl(USER_IMAGE_UPLOAD), formData, {observe: 'response'});
  }
}
