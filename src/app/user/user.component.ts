import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(public service:UserService){}
  userlist!: [];
  ngOnInit() {
    this.userList();
  }
  userList() {
    this.service.getUser().subscribe((response:any)=>{
      this.userlist = response.data;
    })
  }
}
