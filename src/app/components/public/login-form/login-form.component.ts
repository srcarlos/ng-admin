import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { AuthState } from 'src/app/_services/auth/auth.state';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(['']),
    password: new FormControl(
      '',
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')
    ),
  });

  @Input() error: string | null = null;
  @Input() errorMessage: string | null = null;
  @Input() isLoggedIn = false;
  @Input() isLoginFailed = false;

  // @Output() submitEM = new EventEmitter();

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private router: Router
  ) {}

  submit() {
    const { username, password } = this.loginForm.getRawValue();

    this.authService
      .Login(username, password)
      .pipe(
        // it's better to pipe catchError
        catchError((error) => {
          console.log(error);
          this.error = error.error.message;
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (result) => {
          // redirect to dashbaord
          this.router.navigateByUrl(
            this.authState.redirectUrl || '/private/dashboard'
          );
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
      });
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit() {
    this.loginForm.reset();
    this.loginForm.get('username')?.setValue('admin');
    this.loginForm.get('password')?.setValue('Admin1234+');
  }

  // submitEM.emit(this.loginForm.value
}
