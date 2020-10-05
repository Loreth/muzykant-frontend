import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {MatDialog} from '@angular/material/dialog';
import {ImageCropDialogComponent} from '../../shared/components/image-crop-dialog/image-crop-dialog.component';
import {UserImageService} from '../../core/services/user-image.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user$: Observable<User>;
  profileImageLink;

  constructor(private userService: UserService,
              private userImageService: UserImageService,
              private profileImageDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getDto(AuthService.loggedUserId).pipe(
      tap(user => {
        this.setProfileImageLink(user.profileImageLink);
        AuthService.userDisplayName = user.displayName;
      })
    );
  }

  openProfileImageDialog(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(element.files[0]);
      reader.onload = () => {
        const dialogRef = this.profileImageDialog.open(ImageCropDialogComponent, {
          panelClass: 'profile-image-dialog',
          data: {imgUrl: reader.result, cropAspectRatio: 1}
        });

        dialogRef.afterClosed().subscribe((newImageCanvas: HTMLCanvasElement) => {
          if (newImageCanvas) {
            newImageCanvas.toBlob(blob => {
              const imgFile = new File([blob], 'profile-image', {type: 'image/jpg', lastModified: Date.now()});
              this.userImageService.upload(imgFile, AuthService.loggedUserId, 0, true).subscribe(response => {
                this.setProfileImageLink(response.body.link);
              });
            }, 'image/jpeg');
          }
        });
      };
    }
  }

  setProfileImageLink(profileImageLink: string): void {
    if (profileImageLink) {
      this.profileImageLink = profileImageLink + '?d=' + new Date().getTime();
      AuthService.userProfileImageLink = this.profileImageLink;
    }
  }

  getUserDisplayName(): string {
    return AuthService.userDisplayName;
  }
}
