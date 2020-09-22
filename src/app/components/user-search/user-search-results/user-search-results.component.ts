import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../shared/models/user';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0}),
          stagger(90, [
            animate('0.25s', style({opacity: 1}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class UserSearchResultsComponent implements OnInit {
  @Input() users$: Observable<User[]>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
