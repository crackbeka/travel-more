import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChartOptions, ChartType } from 'chart.js';
import {
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet
} from 'ng2-charts';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-price-range-chart',
  templateUrl: './price-range-chart.component.html',
  styleUrls: ['./price-range-chart.component.css'],
})
export class PriceRangeChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [
    '0-200',
    '200-400',
    '400-600',
    '600-800',
    '800-1000',
  ];
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private hotelService: HotelService,
    private userService: UserService,
    private auth: AngularFireAuth
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.userService.getUserRole().subscribe(role => {
      this.auth.user.subscribe(user => {
        if (user?.uid) {
          console.log(role);
          const hotels$ = role === 'HOTEL'
            ? this.hotelService.getHotelsForUser(user.uid)
            : this.hotelService.getAllHotels();

          hotels$.subscribe((res: any) => this.generateChart(res));
        }
      });
    });
  }

  private generateChart(hotels: any[]) {
    console.log(hotels)
    const prices = hotels.map(hotel =>
       hotel?.data?.rooms?.map((room: any) => room.price)
      )
      .reduce((acc, val) => acc.concat(val), [])
      .sort((a: number, b: number) => a - b);

    const price_0_200 = prices.filter((price: number) => price < 200).length;
    const price_200_400 = prices.filter((price: number) => price >= 200 && price < 400).length;
    const price_400_600 = prices.filter((price: number) => price >= 400 && price < 600).length;
    const price_600_800 = prices.filter((price: number) => price >= 600 && price < 800).length;
    const price_800_1000 = prices.filter((price: number) => price >= 800 && price < 1000).length;

    const priceCounts = [
      price_0_200,
      price_200_400,
      price_400_600,
      price_600_800,
      price_800_1000
    ];

    this.pieChartData = priceCounts;
  }
}
