import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMultiComponent } from './form-multi.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:'', 
    component:FormMultiComponent
  },
  {
    path:'create',
    component:CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormMultiRoutingModule { }
