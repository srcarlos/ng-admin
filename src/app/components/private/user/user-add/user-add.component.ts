import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

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
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/_services/user/user.service';
import { IUser } from 'src/app/_services/user/user.model';
import { catchError, throwError } from 'rxjs';

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
    MatDialogModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    UserService,
  ],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  @Output() newUserAdded = new EventEmitter<IUser>();

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required,
    ]),
    email: new FormControl('', Validators.email),
    status: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(
      '',
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')
    ),
  });

  userStatus: IUserStatus[] = [
    { value: 'ACTIVE', viewValue: 'Active' },
    { value: 'INACTIVE', viewValue: 'Inactive' },
  ];

  userRole: IUserRole[] = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'USER', viewValue: 'User' },
  ];

  parentRef: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<UserAddComponent>,
    private userService: UserService
  ) {
    this.parentRef = (dialogRef as any).parentRef;
  }
  @Input() error: string | null = null;
  submit() {
    const formData = this.getFormData();
    this.userService
      .addUser(formData)
      .pipe(
        // it's better to pipe catchError
        catchError((error) => {
          this.error = error.error.message;
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (result) => {
          // redirect to dashbaord

          console.log('UserAddComponent- newUserAdded.emit');
          this.newUserAdded.emit(result);
          this.parentRef.dialogRef.close(result);
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
  }
  cancel() {
    if (!this.dialogRef) {
      return;
    }

    this.parentRef.dialogRef.close();
  }

  getFormData(): IUser {
    return this.form.getRawValue();
  }

  ngOnInit() {
    this.form.reset();
    this.form.get('fullName')?.setValue('admin');
    this.form.get('username')?.setValue('admin');
    this.form.get('email')?.setValue('admin@admin.com');
    this.form.get('status')?.setValue('ACTIVE');
    this.form.get('role')?.setValue('ADMIN');
    this.form.get('password')?.setValue('Admin1234+');
  }
}
