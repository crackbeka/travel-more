import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reservations-chart',
  templateUrl: './reservations-chart.component.html',
  styleUrls: ['./reservations-chart.component.css']
})
export class ReservationsChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  constructor(
    private hotelService: HotelService,
    private userService: UserService,
    private auth: AngularFireAuth
  ) {
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
    const hotelNames = hotels.map(hotel => hotel.data.name);
    const hotelStars = hotels.map(hotel => hotel.data.stars);

    this.barChartData = [
      { data: hotelStars, label: 'Stars' }
    ];
    this.barChartLabels = hotelNames;
  }
}
