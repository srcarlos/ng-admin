import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

interface IUserStatus {
  value: string;
  viewValue: string;
}

interface IUserRole {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent {
  form: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    status: new FormControl(''),
    createdAt: new FormControl(''),
    password: new FormControl(''),
  });

  userStatus: IUserStatus[] = [
    { value: 'ACTIVE', viewValue: 'Active' },
    { value: 'INACTIVE', viewValue: 'Inactive' },
  ];

  userRole: IUserRole[] = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'USER', viewValue: 'User' },
  ];

  constructor(public dialogRef: MatDialogRef<UserAddComponent>) {}
  @Input() error: string | null = null;
  submit() {
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }
}
