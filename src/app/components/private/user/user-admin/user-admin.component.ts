import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from 'src/app/_services/user/user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatCheckboxModule,
    UserListComponent,
  ],
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
})
export class UserAdminComponent {
  title = 'User Module';

  constructor(public dialog: MatDialog, private userService: UserService) {}

  editModal(element: any) {}
  deleteModal(element: any) {}
  addModal() {
    this.dialog.open(UserAddComponent, {
      width: '500px',
    });
  }
}
