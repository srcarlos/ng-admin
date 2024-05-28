import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { AuthState } from 'src/app/_services/auth/auth.state';

@Component({
  selector: 'app-signup-form',
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
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  form: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private router: Router
  ) {}

  submit() {
    console.log('signup');
    console.log(this.authState.redirectUrl);
    this.authService
      .SignUp('fuilName', 'client@email.com', 'password')
      .pipe(
        // it's better to pipe catchError
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (result) => {
          // redirect to dashbaord
          this.router.navigateByUrl(this.authState.redirectUrl);
        },
      });
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
