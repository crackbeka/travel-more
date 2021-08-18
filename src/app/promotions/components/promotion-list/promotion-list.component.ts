import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PromotionService } from 'src/app/services/promotion/promotion.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {

  promotionList!: any[];

  canAddPromotion = false;

  canEditPromotion = false;

  canDeletePromotion = false;

  action?: string;

  selectedPromotion?: any;

  deleting = false;

  constructor(
    private promotionService: PromotionService,
    private hotelService: HotelService,
    private userService: UserService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.userService.getUserRole().subscribe(role => {
      this.canAddPromotion = role === 'HOTEL';
      this.canEditPromotion = role === 'HOTEL';
      this.canDeletePromotion = role !== 'GUEST';

      this.auth.user.subscribe(user => {
        if (user?.uid) {
          const hotels$ = role === 'HOTEL'
            ? this.hotelService.getHotelsForUser(user.uid)
            : this.hotelService.getAllHotels();

          const promotions$ = role === 'HOTEL'
            ? this.promotionService.getPromotionsForUser(user.uid)
            : this.promotionService.getAllPromotions();

          combineLatest([hotels$, promotions$]).subscribe(([ hotels, promotions ]) => {
            this.promotionList = promotions.map((promotion: any) => ({
              ...promotion,
              data: {
                ...promotion.data,
                hotel: hotels.find(hotel => hotel.key === promotion.data.hotel_id),
              }
            }));
          })
        }
      });
    });
  }

  handleAdd(): void {
    this.action = 'add';
  }

  handleEdit(promotion: any): void {
    this.action = 'edit';
    this.selectedPromotion = promotion;
  }

  closeForm(): void {
    this.action = undefined;
    this.selectedPromotion = undefined;
  }

  closeConfirmation(): void {
    this.deleting = false;
    this.selectedPromotion = undefined;
  }

  handleDelete(promotion: any): void {
    this.deleting = true;
    this.selectedPromotion = promotion;
  }

  deletePromotion(): void {
    this.promotionService.delete(this.selectedPromotion.key);

    this.closeConfirmation();
  }

}
