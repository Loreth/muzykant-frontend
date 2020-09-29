import {Identifiable} from './models/identifiable';

export class Comparators {
  static compareById(object1: Identifiable<any>, object2: Identifiable<any>): boolean {
    return object1 && object2 && object1.id === object2.id;
  }
}
