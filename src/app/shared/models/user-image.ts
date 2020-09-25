import {Identifiable} from './identifiable';

export interface UserImage extends Identifiable<number> {
  filename: string;
  link: string;
  userId: number;
  orderIndex: number;
}
