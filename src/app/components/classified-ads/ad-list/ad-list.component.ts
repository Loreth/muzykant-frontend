import {Component, Input} from '@angular/core';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {Observable} from 'rxjs';
import {trigger} from '@angular/animations';
import {Animations} from '../../../shared/animations/animations';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css'],
  animations: [
    trigger('listAnimation', [Animations.enterLeaveTransition])
  ]
})
export class AdListComponent {
  @Input() adsWithChips$: Observable<AdWithChips[]>;
  @Input() noResultsMessage: string;
}
