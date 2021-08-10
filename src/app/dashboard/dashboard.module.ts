import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PriceRangeChartComponent } from './components/price-range-chart/price-range-chart.component';
import { ReservationsChartComponent } from './components/reservations-chart/reservations-chart.component';
import { PopularHotelsChartComponent } from './components/popular-hotels-chart/popular-hotels-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PriceRangeChartComponent,
    ReservationsChartComponent,
    PopularHotelsChartComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ChartsModule
  ],
})
export class DashboardModule { }
