import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(public service:UserService, public router:Router){}
  userlist!: [];
  ngOnInit() {
    this.userList();
  }
  userList() {
    this.service.getUser().subscribe((response:any)=>{
      this.userlist = response.data;
    })
  }

  edit(id:number){
    if(id){
      this.router.navigate([`users/edit/${id}`])
    }
  }
}
