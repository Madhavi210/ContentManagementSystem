import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { ContentService } from 'src/app/core/service/content.service';
import { IUser } from 'src/app/core/model/user.model';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  title = "Admin Dashboard";
  totalUsers: number = 0;
  totalContent: number = 0;
  users: IUser[] = [];
  srNo: number = 0;
  userData: IUser[] = [];
  // userId: string | null = null;

  chartOptions: any;

  constructor(private userService: UserService, private contentService: ContentService) {}

  ngOnInit(): void {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Categories Distribution"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00'%'",
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: 0, label: "Users" },
          { y: 0, label: "Content" },
          { y: 0, label: "Media" }
        ]
      }]
    };

    this.fetchTotalUser();
    this.fetchTotalContent();
  }

  fetchTotalUser() {
    this.userService.getUsers().subscribe(
      response => {
        this.totalUsers = response.totaluser;
        this.users = response.user;
        this.updateChart();
        this.setSerialNumbers();
      },
      error => {
        console.error("Error fetching users:", error);
      }
    );
  }

  fetchTotalContent() {
    this.contentService.getContent().subscribe(
      response => {
        this.totalContent = response.totalCount;
        this.updateChart();
      }, 
      error => {
        console.error("Error fetching content:", error);
      }
    );
  }

  setSerialNumbers() {
    this.users.forEach((user, index) => {
      user.srNo = index + 1;
    });
  }

  updateChart() {
    if (this.chartOptions) {
      this.chartOptions.data[0].dataPoints = [
        { y: this.totalUsers, label: "Users" },
        { y: this.totalContent, label: "Content" },
        { y: 5, label: "Media" }
      ];
    }
  }

  edituser(user:any){
    this.userService.getUserById(user._id).subscribe(
      response => {
        // this.userData = response.user;
        // this.userService.updateUser(user._id ,this.userData)
      }, error => {
        console.log("error in edit");
        
      }
    )
  }

  deleteUser(user:any){
    if(confirm(`Are you sure to delete ${user._id}`)){
      this.userService.deleteUser(user._id).subscribe(
        response => {
          Swal.fire("success", "user deleted successfully", "success", );
          console.log("user deleted successfully",response);
        }, error => {
          Swal.fire("error","please try after ome time", "error")
        }
      )
    } else {
      console.log("error in deletion");
      
    }
  }

}
