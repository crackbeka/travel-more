import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingListComponent } from './components/booking-list/booking-list.component';


@NgModule({
  declarations: [
    BookingListComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule
  ]
})
export class BookingsModule { }
