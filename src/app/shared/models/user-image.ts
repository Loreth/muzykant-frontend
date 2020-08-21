import {Identifiable} from './identifiable.model';

export interface UserImage extends Identifiable<number> {
  link: string;
  userId: number;
  orderIndex: number;
}
