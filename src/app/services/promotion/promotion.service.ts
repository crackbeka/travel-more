import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private basePath = '/promotions';

  constructor(private db: AngularFireDatabase) {}

  async savePromotion(promotion: any) {
    return this.db.list(`${this.basePath}`).push(promotion);
  }

  getPromotionsForUser(userId: any) {
    return this.db.list(`${this.basePath}`, ref => ref.orderByChild('manager_id').equalTo(userId))
      .snapshotChanges().pipe(
        map(promotions => promotions.map(({ payload }) => ({key: payload.key, data: payload.val()})))
      );
  }

  getAllPromotions() {
    return this.db.list(`${this.basePath}`)
      .snapshotChanges().pipe(
        map(promotions => promotions.map(({ payload }) => ({key: payload.key, data: payload.val()})))
      );
  }

  store(values: any) {
    return this.db.list(`${this.basePath}`).push(values);
  }

  update(uid: string, values: any) {
    return this.db.object(`${this.basePath}/${uid}`).update(values);
  }

  delete(uid: string) {
    return this.db.object(`${this.basePath}/${uid}`).remove();
  }
}
