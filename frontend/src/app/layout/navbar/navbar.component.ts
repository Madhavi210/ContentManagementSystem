import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  sidebarActive: boolean = true;

  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }

}
