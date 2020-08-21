import {Nameable} from './nameable.model';

export interface Equipment extends Nameable<number> {
  musicianId: number;
}
