import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import * as moment from 'moment';

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

  selectedRoomIndex: number | undefined;
  selectedRoom: any;
  modalState: boolean = false;
  checkinDate: any;
  checkoutDate: any;
  disabledDates: any[] = [];

  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotelById(this.hotelId).subscribe(res => {
      this.hotel = res
      this.stars = new Array(this.hotel.data.stars);
      console.log(this.hotel);
    })

    this.getDates();
  }

  openBookingModal(index: number){
    this.selectedRoomIndex = index;
    this.selectedRoom = JSON.parse(JSON.stringify(this.hotel.data.rooms[this.selectedRoomIndex]));
    this.modalState = true;
    ['2021-08-05'].forEach(date => {
      this.disabledDates.push(new Date(date))
    });
  }

  book(){

    this.modalState = false;
  }

  checkBookedDate(date: any) {
    const testArray = ['2021-08-05']
    const dateString = `${date.year.toString()}-${('00' + (date.month + 1).toString()).substr(-2)}-${('00' + date.day.toString()).substr(-2)}`;
    console.log(date, dateString)
    const returnedStatus = testArray.indexOf(dateString) > -1 ? true : false;
    return returnedStatus;
  }

  getDates() {
    let currentDate = moment('2021-08-05');
    let endDate = moment('2021-08-10');
    let dates = [];
    while(currentDate.isSameOrBefore(endDate)){
      dates.push(currentDate.format('yyyy-MM-DD'));
      currentDate.add(1, 'days');
    }

    return dates;
  }

}
