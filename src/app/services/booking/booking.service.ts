import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { switchMap, first, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private basePath = '/bookings';

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}

  async saveBooking(booking: any) {
    //const user = await this.auth.currentUser;
    return this.db.list(`${this.basePath}`).push(booking);
  }

  async updateBooking(id: string , booking: any){
    return this.db.list(`${this.basePath}`).update(id, booking)
  }

  getBookingsForUser(userId: any){
    return this.db.list(`${this.basePath}`, ref => ref.orderByChild('user_id').equalTo(userId))
      .snapshotChanges().pipe(
        map(bookings => {
          return bookings.map(booking => ({key: booking.payload.key, data: booking.payload.val()}))
        })
      );
  }

  getBookingById(bookingId: any){
    return this.db.object(`${this.basePath}/${bookingId}`)
      .snapshotChanges().pipe(
        map(booking => {
          return {key: booking.payload.key, data: booking.payload.val()}
        })
      );
  }

  getAllBookings(){
    return this.db.list(`${this.basePath}`)
      .snapshotChanges().pipe(
        map(bookings => {
          return bookings.map(booking => ({key: booking.payload.key, data: booking.payload.val()}))
        })
      );
  }

  deleteBooking(id: any){
    return this.db.list(`${this.basePath}`).remove(id);
  }
}
