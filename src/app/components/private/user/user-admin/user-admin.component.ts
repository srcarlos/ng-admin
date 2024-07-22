import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from 'src/app/_services/user/user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { IUser } from 'src/app/_services/user/user.model';

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
  users: IUser[] = [];
  dialogRef: MatDialogRef<UserAddComponent> | any;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  editModal(element: any) {}
  deleteModal(element: any) {}
  addModal() {
    this.dialogRef = this.dialog.open(UserAddComponent, {
      width: '500px',
      data: {
        parentRef: this,
      },
    });

    //close dialog after all close
    this.dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(`Dialog result: ${result}`);
      if (!result) return;
      this.onUserAdded(result);
    });
  }

  refresh() {
    console.log(`UserAdminComponent - refresh `);
    this.userService.getUserList().subscribe((response) => {
      console.log(`UserAdminComponent - getUserList:`, response.data);
      this.users = response.data;
    });
  }

  onUserAdded(newUser: IUser) {
    console.log('UserAddComponent- onUserAdded');
    this.userService.getUserList().subscribe((response) => {
      console.log(`getUserList:`, response.data);
      this.users = response.data;
    });
  }
  ngOnInit(): void {
     console.log('UserAddComponent- ngOnInit');
    this.refresh();
  }
}
