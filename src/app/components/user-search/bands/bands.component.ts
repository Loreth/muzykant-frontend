import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserType} from '../../../shared/models/user-type';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {Band} from '../../../shared/models/band';
import {BandService} from '../../../core/services/band.service';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {
  bands$: Observable<Band[]>;
  wantedUserType = UserType.BAND;

  constructor(private bandService: BandService) {
  }

  ngOnInit(): void {
    this.bands$ = this.bandService.getDtosPage().pipe(map(page => page.content));
  }

  onChangedFilters(filtersForm: FormGroup): void {
    this.bands$ = this.bandService.searchDtosWithForm(filtersForm, 0, 15)
    .pipe(map(page => page.content));
  }
}
