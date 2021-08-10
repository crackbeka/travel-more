import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-reservations-chart',
  templateUrl: './reservations-chart.component.html',
  styleUrls: ['./reservations-chart.component.css']
})
export class ReservationsChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug', '13 Aug', '14 Aug', '15 Aug'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90, 26, 67, 52, 45, 11, 23, 51, 91], label: 'Reservations' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
