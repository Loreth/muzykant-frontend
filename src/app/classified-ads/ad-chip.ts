enum ChipCssClass {
  INSTRUMENT = 'instrument-chip',
  GENRE = 'genre-chip',
  PERSONAL = 'personal-chip'
}

export interface AdChip {
  label: string;
  cssClass: ChipCssClass;
}
