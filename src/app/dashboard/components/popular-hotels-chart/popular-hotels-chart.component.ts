import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-popular-hotels-chart',
  templateUrl: './popular-hotels-chart.component.html',
  styleUrls: ['./popular-hotels-chart.component.css']
})
export class PopularHotelsChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: any = [];

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
          const hotels$ = role === 'HOTEL'
            ? this.hotelService.getHotelsForUser(user.uid)
            : this.hotelService.getAllHotels();

          hotels$.subscribe((res: any) => this.generateChart(res));
        }
      });
    });
  }

  private generateChart(hotels: any[]) {
    const hotelCities = new Set(hotels.map(hotel => hotel.data.city));
    const hotelsCount = [...hotelCities].map((city: string) => {
      return hotels.filter(hotel => hotel.data.city === city).length;
    });

    const hotelColors = [...hotelCities].map(() => '#' + Math.floor(Math.random()*16777215).toString(16));

    this.pieChartData = hotelsCount;
    this.pieChartLabels = [...hotelCities];
    this.pieChartColors = [
      {
        backgroundColor: hotelColors as any[]
      }
    ];
  }

}
