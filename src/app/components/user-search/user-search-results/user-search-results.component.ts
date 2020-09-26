import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../shared/models/user';
import {trigger} from '@angular/animations';
import {Animations} from '../../../shared/animations/animations';

@Component({
  selector: 'app-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.css'],
  animations: [
    trigger('listAnimation', [Animations.enterLeaveTransition])
  ]
})
export class UserSearchResultsComponent implements OnInit {
  @Input() pluralUserTypeName: string;
  @Input() users$: Observable<User[]>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
