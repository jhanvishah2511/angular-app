import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(
    public service: UserService,
    public router: Router,
    public toastr: ToastrService
  ) {}
  userlist!: [];
  ngOnInit() {
    this.userList();
  }
  userList() {
    this.service.getUser().subscribe((response: any) => {
      this.userlist = response.data;
      this.userlist.forEach((element :any) => {
        if(element.profile_pic){

          const fileName = element.profile_pic;
          this.service.getProfilePic(fileName).subscribe((res: any) => {
            const reader = new FileReader();
            reader.onload = () => {
              element.profile_pic = reader.result as string
            };
            reader.readAsDataURL(res);
          })
        }
      });
    });
  }

  edit(id: number) {
    if (id) {
      this.router.navigate([`users/edit/${id}`]);
    }
  }

  deleteId(id: number) {
    if (id) {
      this.service.deleteId(id).subscribe({
        next: (data: any) => {
          this.toastr.success(data.message, 'Success!');
          this.userList();
        },
        error: (error: any) => {
          console.log('sss', error);
        },
      });
    }
  }

  uploads(id: number){
    if(id){
      this.router.navigate([`users/uploads/${id}`])
    }
  }
}
