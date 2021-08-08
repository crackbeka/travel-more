import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    RegisterRoutingModule,
    CommonModule
  ],
})
export class RegisterModule { }
