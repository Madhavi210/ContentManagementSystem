import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { IUser } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  rowData!: IUser[];
  columnDefs;
  defaultColDef;

  constructor(private userService: UserService) {
    this.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Username', field: 'username', editable: true },
      { headerName: 'Email', field: 'email', editable: true },
      { headerName: 'Role', field: 'role', editable: true },
      // {
      //   headerName: 'Actions',
      //   cellRenderer: 'actionRenderer',
      //   cellRendererParams: {
      //     onEdit: this.editUser.bind(this),
      //     onDelete: this.deleteUser.bind(this)
      //   },
      //   minWidth: 150
      // }
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable:true,
      filter:true,
    };
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.rowData = users;
    });
  }

  // onGridReady(params): void {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  // }

  editUser(user: IUser): void {
    // this.userService.editUser(user);
    console.log("eddit btn clicked");
    
  }

  deleteUser(id: number): void {
    // this.userService.deleteUser(id);
    console.log("delete btn click");
    
  }
}
