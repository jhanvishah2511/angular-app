import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { TokenComponent } from '../token/token.component';
import { UploadsComponent } from './uploads/uploads.component';


@NgModule({
  declarations: [
    EditComponent,
    CreateComponent,
    TokenComponent,
    UploadsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
