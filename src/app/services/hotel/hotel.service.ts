import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { switchMap, first, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private basePath = '/hotels';

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}

  async saveHotel(hotel: any) {
    //const user = await this.auth.currentUser;
    return this.db.list(`${this.basePath}`).push(hotel);
  }

  async updateHotel(id: string , hotel: any){
    return this.db.list(`${this.basePath}`).update(id, hotel)
  }

  getHotelsForUser(userId: any){
    return this.db.list(`${this.basePath}`, ref => ref.orderByChild('manager_id').equalTo(userId))
      .snapshotChanges().pipe(
        map(hotels => {
          return hotels.map(hotel => ({key: hotel.payload.key, data: hotel.payload.val()}))
        })
      );
  }

  getHotelById(hotelId: any){
    console.log(`${this.basePath}/${hotelId}`)
    return this.db.object(`${this.basePath}/${hotelId}`)
      .snapshotChanges().pipe(
        map(hotel => {
          console.log(hotel);
          return {key: hotel.payload.key, data: hotel.payload.val()}
        })
      );
  }

  getAllHotels(){
    return this.db.list(`${this.basePath}`)
      .snapshotChanges().pipe(
        map(hotels => {
          return hotels.map(hotel => ({key: hotel.payload.key, data: hotel.payload.val()}))
        })
      );
  }

  deleteHotel(id: any){
    return this.db.list(`${this.basePath}`).remove(id);
  }
}
