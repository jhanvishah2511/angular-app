import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent {
  constructor(public router: Router, public userService: UserService) {}
  token: any;
  email:any;
  ngOnInit() {
    localStorage.clear()
    this.router.events.subscribe((event: any) => {
      if (event.routerEvent && event.routerEvent instanceof NavigationEnd) {
        let currentUrl = event.routerEvent.url;
        currentUrl = currentUrl.split('/');
        const verify = currentUrl.includes('verify');
        if (verify) {
          this.token = currentUrl.pop();
          this.email = currentUrl[currentUrl.length - 1];
          this.verifyToken();
        }
      }
    });
  }

  verifyToken() {
    const data = {
      token : this.token,
      email: this.email
    }
    this.userService.verifyToken(data).subscribe({
      next: (data: any) => {
      },
      error: (error: any) => {
      },
    });
  }
}
