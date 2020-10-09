import {environment} from '../../environments/environment';

export const ID = '/{id}';
export const SEARCH = '/search';
export const SIGN_UP = '/sign-up';
export const CONFIRM_EMAIL = '/confirm-email';
export const RESEND_MAIL = '/resend-mail';
export const LOGIN = '/login';

export const USER = '/users';
export const CHANGE_PASSWORD = '/change-password';
export const BAND = '/bands';
export const MUSICIAN = '/musicians';
export const REGULAR_USER = '/regular-users';
export const BAND_WANTED_AD = '/band-wanted-ads';
export const MUSICIAN_WANTED_AD = '/musician-wanted-ads';
export const JAM_SESSION_AD = '/jam-session-ads';
export const GENRE = '/genres';
export const INSTRUMENT = '/instruments';
export const EQUIPMENT = '/equipments';
export const USER_IMAGE = '/user-images';
export const VOIVODESHIP = '/voivodeships';
export const SOCIAL_MEDIA_LINKS = '/social-media-links';
export const CHAT_MESSAGE = '/chat-messages';
export const CONVERSATIONS = '/conversations';

export const USER_IMAGE_UPLOAD = '/user-images/upload';

export function getEndpointUrl(endpoint: string): string {
  return environment.apiUrl + endpoint;
}
