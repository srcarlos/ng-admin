import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NgIf, NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavContentComponent } from '../sidenav-content/sidenav-content.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SidenavService } from '../../../../services/sidenav.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    SidenavContentComponent,
    SidenavListComponent,
  ],
})
export class SidenavComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  constructor(
    private observer: BreakpointObserver,
    private sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.sidenavService.isCollapsed$.subscribe((isCollapsed) => {
      //this.isCollapsed = !isCollapsed;
      this.toggleMenu();
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      // this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  onMouseEnter() {
    console.log('mouse enter', this.isCollapsed);
    if (!this.isCollapsed) return;

    this.sidenav.open();
    this.isCollapsed = !this.isCollapsed;
  }
}
