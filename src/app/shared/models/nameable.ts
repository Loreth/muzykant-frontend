import {Identifiable} from './identifiable';

export interface Nameable<ID> extends Identifiable<ID> {
  name: string;
}
