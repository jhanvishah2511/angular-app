import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { FormMultiComponent } from './form-multi/form-multi.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    UserComponent,
    CategoryComponent,
    FormMultiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    DragDropModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
