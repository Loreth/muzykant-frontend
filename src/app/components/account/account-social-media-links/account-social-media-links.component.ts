import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {SocialMediaLinksService} from '../../../core/services/social-media-links.service';
import {AuthService} from '../../../core/services/auth.service';
import {SocialMediaLinks} from '../../../shared/models/social-media-links';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-social-media-links',
  templateUrl: './account-social-media-links.component.html',
  styleUrls: ['./account-social-media-links.component.css']
})
export class AccountSocialMediaLinksComponent implements OnInit {
  socialMediaLinksForm = new FormGroup({
    youtube: new FormControl(),
    soundcloud: new FormControl(),
    webpage: new FormControl()
  });
  shouldRenderSoundcloudWidget = false;
  snackbarDurationInSeconds = 2.5;

  get soundcloud(): AbstractControl {
    return this.socialMediaLinksForm.get('soundcloud');
  }

  get youtube(): AbstractControl {
    return this.socialMediaLinksForm.get('youtube');
  }

  get webpage(): AbstractControl {
    return this.socialMediaLinksForm.get('webpage');
  }

  constructor(private socialMediaLinksService: SocialMediaLinksService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.socialMediaLinksService.getDto(AuthService.loggedUserId).subscribe(dto => {
      if (dto) {
        this.soundcloud.setValue(dto.soundcloud);
        this.youtube.setValue(dto.youtube);
        this.webpage.setValue(dto.webpage);
      }
      if (this.soundcloud.value) {
        this.shouldRenderSoundcloudWidget = true;
      }
    });
  }

  onSubmit(): void {
    if (this.socialMediaLinksForm.valid) {
      console.log('submitting valid socialMediaLinksForm');
      const socialMediaLinks = this.socialMediaLinksForm.value as SocialMediaLinks;
      socialMediaLinks.id = AuthService.loggedUserId;
      socialMediaLinks.userId = AuthService.loggedUserId;
      this.socialMediaLinksService.updateDto(socialMediaLinks).subscribe(response => {
        this.openSnackBar(response != null);
        if (this.soundcloud.value) {
          this.shouldRenderSoundcloudWidget = true;
        }
      });
    }
  }

  openSnackBar(success: boolean): void {
    let message = 'Coś poszło nie tak';
    if (success) {
      message = 'Zmiany zostały zapisane';
    }
    this.snackBar.open(message,
      '', {duration: this.snackbarDurationInSeconds * 1000, panelClass: ['snackbar']}
    );
  }
}
