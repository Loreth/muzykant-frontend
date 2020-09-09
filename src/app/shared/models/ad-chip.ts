export enum ChipCssClass {
  INSTRUMENT = 'instrument-chip',
  GENRE = 'genre-chip',
  GENDER = 'gender-chip',
  AGE = 'age-chip'
}

export class AdChip {
  constructor(label: string, cssClass: ChipCssClass) {
    this.label = label;
    this.cssClass = cssClass;
  }

  label: string;
  cssClass: ChipCssClass;
}
