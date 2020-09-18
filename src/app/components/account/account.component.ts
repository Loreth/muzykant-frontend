import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profileImageLink: string;

  constructor(private userService: UserService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('user_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/account_circle-black-48dp.svg'));
    iconRegistry.addSvgIcon('soundcloud', sanitizer.bypassSecurityTrustResourceUrl('assets/img/soundcloud-circle.svg'));
  }

  ngOnInit(): void {
    this.userService.getDto(AuthService.loggedUserId).subscribe(
      user => this.profileImageLink = user.profileImageLink
    );
  }
}
