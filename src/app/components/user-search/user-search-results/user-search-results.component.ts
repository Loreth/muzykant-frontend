import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.css']
})
export class UserSearchResultsComponent implements OnInit {
  @Input() users$: Observable<User[]>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
