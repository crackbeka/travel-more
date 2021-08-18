import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailsComponent,
    SlideshowComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    FormsModule,
    CalendarModule,
  ]
})
export class HotelsModule { }
