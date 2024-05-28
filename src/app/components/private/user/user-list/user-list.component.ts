import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from 'src/app/_services/user/user.service';
import { map } from 'rxjs';
import { IUser } from 'src/app/_services/user/user.model';
import { UserEditComponent } from '../user-edit/user-edit.component';

// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
// }

const USER_DATA: IUser[] = [
  { id: '1', name: 'Carlos Marcano', email: 'user@user.com' },
];

@Component({
  selector: 'app-user-list',
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
    MatDialogModule,
    MatPaginatorModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  dataSource = USER_DATA;
  data: IUser[] = [];
  displayedColumns = [
    /*'select',*/ 'id',
    'fullName',
    'email',
    'role',
    'status',
    'actions',
  ];

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  getUserList() {
    this.userService.getUserList().subscribe((response) => {
      this.data = response.data;
    });
  }

  editModal(element: any) {
    this.dialog.open(UserEditComponent, {
      width: '500px',
    });
  }
  deleteModal(element: any) {}
  addModal() {
    this.dialog.open(UserAddComponent, {
      width: '500px',
    });
  }
  ngOnInit(): void {
    this.getUserList();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
