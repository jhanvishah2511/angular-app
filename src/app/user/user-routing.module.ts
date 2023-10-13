import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { TokenComponent } from '../token/token.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'create', component: CreateComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
