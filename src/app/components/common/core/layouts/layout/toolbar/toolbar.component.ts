import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SidenavService } from '../../../../services/sidenav.service';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
})
export class ToolbarComponent {
  constructor(public sidenavService: SidenavService) {}

  onMenuClick() {
    this.sidenavService.toggle();
  }
}
