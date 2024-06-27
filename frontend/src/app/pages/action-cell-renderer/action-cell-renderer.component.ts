import { Component } from '@angular/core';
import { IUser } from 'src/app/core/model/user.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.scss']
})
export class ActionCellRendererComponent {
  private params: any;
  user!: IUser;

  agInit(params: any): void {
    this.params = params;
    this.user = this.params.data;
  }

  onEdit(): void {
    if (this.params.onEdit) {
      // this.params.onEdit(this.user);
    }
  }

  onDelete(): void {
    if (this.params.onDelete) {
      // this.params.onDelete(this.user.id);
    }
  }

  refresh(params: any): boolean {
    return false;
  }

}
