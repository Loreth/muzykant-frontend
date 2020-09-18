import {Nameable} from './nameable';

export interface Equipment extends Nameable<number> {
  musicianId: number;
}
