import {Identifiable} from './identifiable';

export interface UserImage extends Identifiable<number> {
  link: string;
  userId: number;
  orderIndex: number;
}
