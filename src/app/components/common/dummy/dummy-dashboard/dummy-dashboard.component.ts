import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DummyActivityComponent } from '../dummy-activity/dummy-activity.component';
import { DummyTableComponent } from '../dummy-table/dummy-table.component';
import { CardComponent } from '../../core/card/card.component';
import { LineChartComponent } from '../../core/charts/line-chart/line-chart.component';
import { BarLineChartComponent } from '../../core/charts/barline-chart/barline-chart.component';
import { BarChartComponent } from '../../core/charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-dummy-dashboard',
  standalone: true,
  templateUrl: './dummy-dashboard.component.html',
  styleUrls: ['./dummy-dashboard.component.css'],
  imports: [
    CommonModule,
    CardComponent,
    BarChartComponent,
    LineChartComponent,
    BarLineChartComponent,
    MatGridListModule,
    DummyActivityComponent,
    DummyTableComponent,
  ],
})
export class DummyDashboardComponent implements OnInit {
  public cols: number = 4;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 4,
    sm: 2,
    xs: 1,
  };

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
          }
        }
      });
  }

  ngOnInit() {}
}
