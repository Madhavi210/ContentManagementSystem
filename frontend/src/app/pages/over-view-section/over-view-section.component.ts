import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/service/user.service';
import { ContentService } from 'src/app/core/service/content.service';
import { IUser } from 'src/app/core/model/user.model';
import { IContent } from 'src/app/core/model/content.model';

@Component({
  selector: 'app-over-view-section',
  templateUrl: './over-view-section.component.html',
  styleUrls: ['./over-view-section.component.scss']
})
export class OverViewSectionComponent implements OnInit{

  userRole: string|null = null;
  users!: IUser[];
  totalUsers!: number;
  content!: IContent[];
  totalContents!: number;

  constructor(private router:Router, private userService:UserService, private contentService:ContentService){}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.getAllContent();
    this.getAllUsers();
  }

  createContent(){
    if(this.userRole === 'editor' || this.userRole === 'admin'){
      this.router.navigate(['/createContent'])
    } else {
      Swal.fire("Info", "Unauthorized user", "info")
    }
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response.user;
        this.totalUsers = response.totaluser;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getAllContent(): void {
    this.contentService.getContent().subscribe(
      response => {
        this.content = response.content;
        this.totalContents = response.totalCount;
      },
      error => {
        console.error('Error fetching content:', error);
      }
    );
  }


}
