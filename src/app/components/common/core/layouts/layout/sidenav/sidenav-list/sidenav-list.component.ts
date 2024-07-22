import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { first, switchMap } from 'rxjs';

import { HostListener } from '@angular/core';
import { AuthState } from 'src/app/_services/auth/auth.state';
import { AccountService } from 'src/app/_services/auth/account.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
@Component({
  standalone: true,
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NgIf,
  ],
})
export class SidenavListComponent {
  events: string[] = [];
  appropriateClass: string = '';

  @Input()
  isCollapsed = false;

  constructor(
    private router: RouterModule,
    private authState: AuthState,
    private accountService: AccountService,
    private authService: AuthService
  ) {
    this.getScreenHeight();
  }

  getScreenHeight() {
    //console.log('getScreenHeight:', window.innerHeight);
    //  console.log('window:', window);
    if (window.innerHeight <= 412) {
      this.appropriateClass = 'bottomRelative';
    } else {
      this.appropriateClass = 'bottomStick';
    }
  }
  Logout() {
    // logout and reroute
    this.authState.Logout(true);
    // also remove redirect
    this.authState.redirectUrl = ''; // null;
    // also local logout if using local server to set cookie
    this.authService.Logout().subscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.getScreenHeight();
  }
}
