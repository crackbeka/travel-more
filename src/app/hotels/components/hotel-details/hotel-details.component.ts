import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as moment from 'moment';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit {
  hotelId: any;
  hotel: any;
  stars: any[] = [];
  hotelOptions: any = {
    fitness: {
      title: 'Fiitness',
      icon: 'fitness_center',
    },
    parking: {
      title: 'Parking',
      icon: 'local_parking',
    },
    pool: {
      title: 'Pool',
      icon: 'pool',
    },
    restaurant: {
      title: 'Restaurant',
      icon: 'restaurant',
    },
    sauna: {
      title: 'Sauna',
      icon: 'spa',
    },
    wifi: {
      title: 'Wifi',
      icon: 'wifi',
    },
  };

  selectedRoomIndex: number | undefined;
  selectedRoom: any;
  modalState: boolean = false;
  checkinDate: any;
  checkoutDate: any;
  disabledDates: any[] = [];
  user: any;
  userRole: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private userService: UserService,
    private hotelService: HotelService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotelById(this.hotelId).subscribe((res) => {
      this.hotel = res;
      this.stars = new Array(Math.floor(this.hotel.data.stars));
    });

    this.userService.getUserRole().subscribe((role) => {
      this.userRole = role;
      this.auth.user.subscribe((user) => {
        this.user = user?.uid;
      });
    });

    this.getDates();
  }

  openBookingModal(index: number) {
    this.disabledDates = [];
    this.selectedRoomIndex = index;
    this.selectedRoom = JSON.parse(
      JSON.stringify(this.hotel.data.rooms[this.selectedRoomIndex])
    );
    this.modalState = true;
    if (this.selectedRoom.hasOwnProperty('sale_dates'))
      this.selectedRoom.sale_dates.forEach((date: string) => {
        this.disabledDates.push(new Date(date));
      });
  }

  book() {
    if (this.checkinDate && this.checkoutDate) {
      const payload = {
        user_id: this.user,
        dates: this.getDates(),
        hotel_name: this.hotel.data.name,
        room_name: this.selectedRoom.name,
        hotel_id: this.hotel.key,
        room_id: this.selectedRoomIndex,
      };

      this.bookingService
        .saveBooking(payload)
        .then((res) => {
          this.selectedRoom['sale_dates'] = this.selectedRoom['sale_dates']
            ? [...this.selectedRoom['sale_dates'], ...payload.dates]
            : payload.dates;
          if (
            this.selectedRoomIndex != null &&
            this.selectedRoomIndex != undefined
          )
            this.hotel.data.rooms[this.selectedRoomIndex] = {
              ...this.hotel.data.rooms[this.selectedRoomIndex],
              ...this.selectedRoom,
            };
          this.hotelService
            .updateHotel(this.hotel.key, this.hotel.data)
            .then((res) => {
              this.clearForm();
            })
            .catch((err) => {
              this.clearForm();
            });
        })
        .catch((err) => {
          console.log(err);
          this.clearForm();
        });
    }
  }

  checkBookedDate(date: any) {
    let returnedStatus = false;
    if (this.selectedRoom.hasOwnProperty('sale_dates')) {
      const dateString = this.formatDate(date);
      returnedStatus =
        this.selectedRoom.sale_dates.indexOf(dateString) > -1 ? true : false;
    }
    return returnedStatus;
  }

  getDates() {
    let currentDate = moment(this.checkinDate);
    let endDate = moment(this.checkoutDate);
    let dates = [];
    while (currentDate.isSameOrBefore(endDate)) {
      dates.push(currentDate.format('yyyy-MM-DD'));
      currentDate.add(1, 'days');
    }
    return dates;
  }

  formatDate(date: any) {
    return `${date.year.toString()}-${(
      '00' + (date.month + 1).toString()
    ).substr(-2)}-${('00' + date.day.toString()).substr(-2)}`;
  }

  clearForm() {
    this.checkinDate = null;
    this.checkoutDate = null;
    this.modalState = false;
    this.selectedRoom = null;
    this.selectedRoomIndex = -1;
    this.disabledDates = [];
  }
}
