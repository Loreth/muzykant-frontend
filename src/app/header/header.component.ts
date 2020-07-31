import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleSidenav = () => {
    // TODO
  };

}
