import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  selector: 'app-popular-hotels-chart',
  templateUrl: './popular-hotels-chart.component.html',
  styleUrls: ['./popular-hotels-chart.component.css']
})
export class PopularHotelsChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [
    'Rooms',
    'Holiday Inn',
    'Biltmore',
    'Sheraton',
  ];
  public pieChartData: SingleDataSet = [400, 300, 100, 200];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}
