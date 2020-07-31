export const API_PORT = '8080';
export const API_BASE_URL = 'localhost';
export const ID = '/{id}';
export const SEARCH = '/search';
export const SIGN_UP = '/sign-up';

export const BAND = '/bands';
export const MUSICIAN = '/musicians';
export const REGULAR_USER = '/regular-users';
export const BAND_WANTED_AD = '/band-wanted-ads';
export const MUSICIAN_WANTED_AD = '/musician-wanted-ads';
export const JAM_SESSION_AD = '/jam-session-ads';
export const INSTRUMENT = '/instruments';
export const EQUIPMENT = '/equipments';
export const IMAGE = '/images';
export const PREDEFINED_VOCAL_RANGE = '/predefined-vocal-ranges';
export const VOCAL_TECHNIQUE = '/vocal-techniques';

export function getEndpointUrl(endpointName: string): string {
  return API_BASE_URL + '/' + API_PORT + '/' + endpointName;
}
