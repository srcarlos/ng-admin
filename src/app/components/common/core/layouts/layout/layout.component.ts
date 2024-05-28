import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from '../../../services/sidenav.service';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../../card/card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    SidenavComponent,
    ToolbarComponent,
    CardComponent,
    SidenavContentComponent,
  ],
})
export class LayoutComponent {
  constructor(public sidenavService: SidenavService) {}
}
