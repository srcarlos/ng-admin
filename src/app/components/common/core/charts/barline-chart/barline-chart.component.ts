import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-barline-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barline-chart.component.html',
  styleUrls: ['./barline-chart.component.css'],
})
export class BarLineChartComponent {
  public chart: any;

  createChart() {
    const labels = [
      '2022-05-10',
      '2022-05-11',
      '2022-05-12',
      '2022-05-13',
      '2022-05-14',
      '2022-05-15',
      '2022-05-16',
      '2022-05-17',
    ];

    this.chart = new Chart('MyBarLineChart', {
      type: 'line',

      data: {
        // values on X-Axis
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: ['5', '6', '1', '2', '1', '0.00', '1', '2'],

            backgroundColor: 'blue',
            stack: 'combined',
            type: 'bar',
          },
          {
            label: 'Dataset 2',
            data: ['1', '2', '3', '4', '17', '0', '2', '10'],

            backgroundColor: 'limegreen',
            stack: 'combined',
          },
        ],
      },
      options: {
        aspectRatio: 1,
        scales: {
          y: {
            stacked: true,
          },
        },
      },
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
