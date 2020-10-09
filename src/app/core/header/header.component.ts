import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {tap} from 'rxjs/operators';
import {ChatMessageService} from '../services/chat-message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks = [
    {path: 'ads', label: 'Ogłoszenia'},
    {path: 'musicians', label: 'Muzycy'},
    {path: 'bands', label: 'Zespoły'},
  ];
  $user: Observable<User>;

  constructor(private authService: AuthService,
              private userService: UserService,
              private chatMessageService: ChatMessageService) {
  }

  ngOnInit(): void {
    this.chatMessageService.getChatQueue().subscribe();
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get linkName(): string {
    return TokenStorageService.getClaims().linkName;
  }

  logout(): void {
    this.$user = null;
    this.authService.logout();
  }

  getUserDisplayName(): string {
    if (this.authService.isFullyRegistered()) {
      this.fetchUserIfNotFetched();
      return AuthService.userDisplayName;
    }
    return 'Konto';
  }

  getUserProfileImageLink(): string {
    if (this.authService.isFullyRegistered()) {
      this.fetchUserIfNotFetched();
      return AuthService.userProfileImageLink;
    }
  }

  fetchUserIfNotFetched(): void {
    if (this.authService.isFullyRegistered() && this.$user == null) {
      this.$user = this.userService.getDto(AuthService.loggedUserId).pipe(
        tap(user => {
          console.log('setting display name and profile image link in header');
          AuthService.userDisplayName = user.displayName;
          if (user.profileImageLink) {
            AuthService.userProfileImageLink = user.profileImageLink + '?d=' + new Date().getTime();
          }
        })
      );
    }
  }

  getUnseenMessagesCount(): number {
    return this.chatMessageService.getUnseenConversationsCount();
  }
}
