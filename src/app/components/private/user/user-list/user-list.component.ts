import {
  AfterViewInit,
  Component,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user/user.service';
import { map } from 'rxjs';
import { IUser } from 'src/app/_services/user/user.model';
import { UserEditComponent } from '../user-edit/user-edit.component';
const USER_DATA: IUser[] = [];

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
export class UserListComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<IUser>(USER_DATA);
  @Input() data: IUser[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = [
    /*'select',*/ 'id',
    'fullName',
    'email',
    'role',
    'status',
    'actions',
  ];

  length = 500;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOptions = [10, 50, 500];
  showFirstLastButtons = true;

  dialogRef: any;
  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUserList() {
    this.userService.getUserList().subscribe((response) => {
      // this.data = response.data;
      this.dataSource.data = response.data;
    });
  }

  editModal(element: any) {
    this.dialogRef = this.dialog.open(UserEditComponent, {
      width: '500px',
    });
  }
  deleteModal(element: any) {}

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data']) return;
    this.dataSource.data = changes['data'].currentValue;
  }
}
