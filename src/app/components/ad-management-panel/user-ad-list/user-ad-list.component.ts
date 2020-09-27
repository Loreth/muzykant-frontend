import {Component, Input} from '@angular/core';
import {trigger} from '@angular/animations';
import {Animations} from '../../../shared/animations/animations';
import {AdWithChips} from '../../../shared/models/ad-with-chips';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  noResultsMessage = 'Nie masz aktualnie żadnego aktywnego ogłoszenia';
  snackbarDurationInSeconds = 2.5;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
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
            this.openSnackBar(true);
          },
          () => this.openSnackBar(false)
        );
      }
    });
  }

  editAd(adWithChips: AdWithChips) {

  }

  openSnackBar(success: boolean): void {
    let message = 'Coś poszło nie tak';
    if (success) {
      message = 'Ogłoszenie zostało usunięte';
    }
    this.snackBar.open(message,
      '', {duration: this.snackbarDurationInSeconds * 1000, panelClass: ['snackbar']}
    );
  }
}
