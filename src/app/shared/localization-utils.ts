import {UserType} from './models/UserType';

export class LocalizationUtils {
  public static localizeUserType(userType: UserType): string {
    let localizedUserType: string;
    switch (userType) {
      case UserType.MUSICIAN:
        localizedUserType = 'Muzyk';
        break;
      case UserType.BAND:
        localizedUserType = 'Zespół';
        break;
      case UserType.REGULAR:
        localizedUserType = 'Zwykły użytkownik';
        break;
    }

    return localizedUserType;
  }
}
