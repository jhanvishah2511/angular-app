import { Component } from '@angular/core';
import { AuthServiceService } from '../common/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: AuthServiceService, public router:Router, public toastr:ToastrService) {}

  logout() {
    this.authService.logout().subscribe((response:any) => {
      this.toastr.success(response.message, 'Success!');
      localStorage.clear();
      this.router.navigate(['/login'])
    });
  }
}
