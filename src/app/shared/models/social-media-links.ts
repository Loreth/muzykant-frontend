import {Identifiable} from './identifiable';

export interface SocialMediaLinks extends Identifiable<number> {
  youtube: string;
  soundcloud: string;
  webpage: string;
  userId: number;
  version: number;
}
