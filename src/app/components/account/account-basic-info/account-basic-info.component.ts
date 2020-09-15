import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Voivodeship} from '../../../shared/models/voivodeship.model';
import {FormControl, FormGroup} from '@angular/forms';
import {VoivodeshipService} from '../../../core/services/voivodeship.service';
import {MusicianService} from '../../../core/services/musician.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-account-basic-info',
  templateUrl: './account-basic-info.component.html',
  styleUrls: ['./account-basic-info.component.css']
})
export class AccountBasicInfoComponent implements OnInit {
  voivodeships$: Observable<Voivodeship[]>;
  basicInfoForm = new FormGroup({
    user: new FormControl(),
    person: new FormControl()
  });
  formSubmittedStatus: Subject<boolean> = new Subject();

  constructor(private voivodeshipService: VoivodeshipService, private musicianService: MusicianService, private router: Router) {
  }

  ngOnInit(): void {
    this.voivodeships$ = this.voivodeshipService.getDtosPage(0, 2000, ['name']).pipe(map(page => page.content));
  }
}
