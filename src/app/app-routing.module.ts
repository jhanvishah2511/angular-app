import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { TokenComponent } from './token/token.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'verify/:email/:token', component: TokenComponent },
  {
    path: 'dashboard',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'categories',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./category/category.module').then((m) => m.CategoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
