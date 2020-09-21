import {Component, OnInit} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {UserImageService} from '../../../core/services/user-image.service';
import {UserImage} from '../../../shared/models/user-image';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {forkJoin, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-account-photos',
  templateUrl: './account-photos.component.html',
  styleUrls: ['./account-photos.component.css']
})
export class AccountPhotosComponent implements OnInit {
  userImages: UserImage[] = [];
  newImageFiles = [];
  deletedUserImagesIds: number[] = [];
  snackbarDurationInSeconds = 2.5;
  saveButtonDisabled = false;

  constructor(private userImageService: UserImageService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const httpParams = new HttpParams().set('userId', AuthService.loggedUserId.toString());
    this.userImageService.searchDtos(httpParams).subscribe(
      page => {
        this.userImages = page.content.sort(
          (image1, image2) => image1.orderIndex - image2.orderIndex);
      });
  }

  dropped(files: NgxFileDropEntry[]): void {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const newUserImage: UserImage = {
              id: null,
              userId: AuthService.loggedUserId,
              link: reader.result as string,
              orderIndex: files.length
            };
            this.userImages.push(newUserImage);
            this.newImageFiles.push({file, newUserImage});
          };
        });
      }
    }
  }

  removeImage(image: UserImage): void {
    const indexOfImage = this.userImages.indexOf(image);
    this.userImages.splice(indexOfImage, 1);
    if (image.id) {
      console.log(`pushing image id=${image.id} to delete list`);
      this.deletedUserImagesIds.push(image.id);
    }
  }

  savePhotos(): void {
    this.saveButtonDisabled = true;
    console.log('beginning to save photos');
    const requests: Observable<any>[] = [];

    for (const id of this.deletedUserImagesIds) {
      console.log(`deleting photo with id=${id}`);
      requests.push(this.userImageService.deleteDto(id));
    }

    for (let i = 0; i < this.userImages.length; i++) {
      const userImage = this.userImages[i];
      userImage.orderIndex = i;
      console.log(`operating on userImage id=${userImage.id}`);
      console.log(userImage);

      if (userImage.id) {
        requests.push(this.userImageService.updateDto(userImage));
      } else {
        const image: File = this.newImageFiles.filter(x => x.newUserImage === userImage)[0].file;
        requests.push(this.userImageService.upload(image, userImage.userId, i).pipe(
          tap(response => userImage.link = response.body.link)
        ));
      }
    }

    forkJoin(requests).subscribe(() => {
      this.openSnackBar(true);
      this.deletedUserImagesIds.length = 0;
      this.newImageFiles.length = 0;
      this.saveButtonDisabled = false;
    }, () => this.openSnackBar(false));
  }

  openSnackBar(success: boolean): void {
    let message = 'Coś poszło nie tak';
    if (success) {
      message = 'Zdjęcia zostały zapisane';
    }
    this.snackBar.open(message,
      '', {duration: this.snackbarDurationInSeconds * 1000, panelClass: ['snackbar']}
    );
  }
}
