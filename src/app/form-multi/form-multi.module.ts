import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMultiRoutingModule } from './form-multi-routing.module';
import { CreateComponent } from './create/create.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [CreateComponent, AddressComponent],
  imports: [CommonModule, FormMultiRoutingModule, ReactiveFormsModule],
})
export class FormMultiModule {}
