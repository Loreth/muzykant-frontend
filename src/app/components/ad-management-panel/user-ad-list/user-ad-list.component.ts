import {Component, EventEmitter, Input, Output} from '@angular/core';
import {trigger} from '@angular/animations';
import {Animations} from '../../../shared/animations/animations';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {AdServiceFactoryService} from '../../../core/services/ad-service-factory.service';

@Component({
  selector: 'app-user-ad-list',
  templateUrl: './user-ad-list.component.html',
  styleUrls: ['./user-ad-list.component.css'],
  animations: [
    trigger('listAnimation', [Animations.enterLeaveTransition])
  ]
})
export class UserAdListComponent {
  @Input() userAdsWithChips$: Observable<AdWithChips[]>;
  @Output() messageEmit = new EventEmitter<string>();
  noResultsMessage = 'Nie masz aktualnie żadnego aktywnego ogłoszenia';

  constructor(private dialog: MatDialog,
              private adServiceFactoryService: AdServiceFactoryService) {
  }

  deleteAd(userAdsWithChips: AdWithChips[], adToDelete: AdWithChips): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: 'Czy na pewno chcesz usunąć ogłoszenie?'}
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.adServiceFactoryService.getAdService(adToDelete.ad.adType).deleteDto(adToDelete.ad.id).subscribe(
          () => {
            const adIndex = userAdsWithChips.indexOf(adToDelete);
            userAdsWithChips.splice(adIndex, 1);
            this.messageEmit.emit('Ogłoszenie zostało usunięte');
          },
          () => this.messageEmit.emit(null)
        );
      }
    });
  }
}
