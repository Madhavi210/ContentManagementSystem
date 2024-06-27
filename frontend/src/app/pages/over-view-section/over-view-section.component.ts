import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-over-view-section',
  templateUrl: './over-view-section.component.html',
  styleUrls: ['./over-view-section.component.scss']
})
export class OverViewSectionComponent implements OnInit{

  userRole: string|null = null;
  constructor(private router:Router){}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }
  createContent(){
    if(this.userRole === 'editor' || this.userRole === 'admin'){
      this.router.navigate(['/createContent'])
    } else {
      Swal.fire("Info", "Unauthorized user", "info")
    }
  }
}
