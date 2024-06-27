import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/authentication/login.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userRole:string | null = null;
  userId: string | null = null;

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
  }

  sidebarActive: boolean = true;

  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }

  logoutUser(){
    this.loginService.logout();
    Swal.fire("success", "user logout successfully", "success")
  }

  fetchdata(){
    this.userId ,
    this.userRole 
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap dropdowns
    const dropdownToggleList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownToggleList.forEach(dropdownToggleEl => {
      new bootstrap.Dropdown(dropdownToggleEl);
    });
  }
}

