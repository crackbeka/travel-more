import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  user: any;
  userRole: string | undefined;
  bookings: any[] = [];

  constructor(private router: Router, private auth: AngularFireAuth, private bookingService: BookingService, private hotelService: HotelService, private userService: UserService) {
    this.userService.getUserRole().subscribe((role) => {
      this.userRole = role;
      if (role !== 'GUEST') {
        this.router.navigate(['/hotels']);
      }else{
        this.auth.user.subscribe(user => {
          this.user = user?.uid;
          if (this.user) {
              this.bookingService.getBookingsForUser(this.user).subscribe((res: any) => {
                console.log(res);
                this.bookings = res});
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  deleteBooking(booking){
    this.hotelService.getHotelById(booking.data.hotel_id)
        .subscribe((hotel: any) => {
          const excludedDates = this.excludeDates(hotel.data?.rooms[booking.data.room_id].sale_dates, booking.data.dates);
          hotel.data.rooms[booking.data.room_id].sale_dates = [...excludedDates];
          this.hotelService.updateHotel(hotel.key, hotel.data).then(res => {
            this.bookingService.deleteBooking(booking.key)
          })
        })
  }

  excludeDates(dates, datesToExclude){
    if(dates && datesToExclude){
      const excludedDates: string[] = dates ? [...dates] : [];
      datesToExclude.forEach(element => {
        excludedDates.splice(excludedDates.indexOf(element), 1);
      });
      return excludedDates;
    }else{
      return [];
    }
  }

}
