import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { PromotionFormComponent } from './components/promotion-form/promotion-form.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [PromotionListComponent, PromotionFormComponent, DeleteConfirmationComponent],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PromotionsModule { }
