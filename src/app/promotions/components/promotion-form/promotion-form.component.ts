import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.css']
})
export class PromotionFormComponent implements OnInit {

  @Output()
  close = new EventEmitter<void>();

  @Input()
  action?: string;

  @Input()
  promotion?: any;

  form!: FormGroup;

  hotels!: any[];

  success = false;

  constructor(
    private promotionService: PromotionService,
    private hotelService: HotelService,
    private auth: AngularFireAuth,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.generateForm();

    this.auth.user.subscribe(user => {
      if (user?.uid) {
        this.form.get('manager_id')?.setValue(user.uid)

        this.hotelService.getHotelsForUser(user.uid).subscribe(hotels => {
          this.hotels = hotels;
        });
      }
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    const action$ = this.action === 'add'
      ? this.promotionService.store(this.form.value)
      : this.promotionService.update(this.promotion.key, this.form.value);

    action$.then(() => this.success = true);
  }

  isInvalid(controlName: string, validation?: string): boolean | undefined {
    const control = this.form.get(controlName);
    const invalid = !control?.valid && (control?.dirty || control?.touched);
    return validation ? invalid && control?.hasError(validation) : invalid;
  }

  private generateForm(): void {
    this.form = this.fb.group({
      manager_id: [''],
      hotel_id: [this.promotion?.data.hotel_id ?? '', Validators.required],
      title: [this.promotion?.data.title ?? '', Validators.required],
      sale: [this.promotion?.data.sale ?? '', Validators.required],
    });
  }

}
