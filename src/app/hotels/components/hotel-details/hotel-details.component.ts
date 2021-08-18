import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  hotelId: any;
  hotel: any;
  stars: any[] = [];
  hotelOptions: any = {
    'fitness': {
      title: 'Fiitness',
      icon: 'fitness_center'
    },
    'parking': {
      title: 'Parking',
      icon: 'local_parking'
    },
    'pool': {
      title: 'Pool',
      icon: 'pool'
    },
    'restaurant': {
      title: 'Restaurant',
      icon: 'restaurant'
    },
    'sauna': {
      title: 'Sauna',
      icon: 'spa'
    },
    'wifi':{
      title: 'Wifi',
      icon: 'wifi'
    }
  }

  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotelById(this.hotelId).subscribe(res => {
      this.hotel = res
      this.stars = new Array(this.hotel.data.stars);
      console.log(this.hotel);
    })
  }

}
