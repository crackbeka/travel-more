import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private basePath = '/hotels';

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}

  async saveHotel(hotel: any) {
    const user = await this.auth.currentUser;
    return this.db.list(`${this.basePath}/${user?.uid}`).push(hotel);
  }
}
