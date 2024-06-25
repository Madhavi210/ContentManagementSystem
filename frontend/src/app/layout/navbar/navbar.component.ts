import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sidebarVisible: boolean = false;

  constructor() { }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
