import {Identifiable} from './identifiable.model';

export interface Nameable<ID> extends Identifiable<ID> {
  name: string;
}
