import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {TokenStorageService} from '../shared/services/token-storage.service';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get linkName(): string {
    return TokenStorageService.getClaims().linkName;
  }

  logout(): void {
    this.authService.logout();
  }

  onToggleSidenav = () => {
    // TODO
  };
}
