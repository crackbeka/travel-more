import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private basePath = '/hotels';
  constructor(private db: AngularFireDatabase) { }

  saveHotel(hotel: any){
    return this.db.list(this.basePath).push(hotel);
  }
}
