import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
})
export class UploadsComponent {
  userId: any;
  multiSelectedFiles: any;
  constructor(
    public router: Router,
    public userService: UserService,
    public toastr: ToastrService
  ) {}
  ngOnInit() {
    let userId;
    this.router.events.subscribe((event: any) => {
      if (event.routerEvent instanceof NavigationEnd) {
        const currentUrl = event.routerEvent.url;
        userId = currentUrl.split('/');
        const uploads = userId.includes('uploads');
        userId = currentUrl.split('/').pop();
        if (uploads) {
          this.userId = userId;
        }
      }
    });
  }

  multiSelect(event: any) {
    this.multiSelectedFiles = event.target.files;
  }

  Submit() {
    if (this.multiSelectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < this.multiSelectedFiles.length; i++) {
        formData.append('docs', this.multiSelectedFiles[i]);
      }
      const uploadData = formData;
      this.userService.uploadMultiple(uploadData, this.userId).subscribe({
        next: (data: any) => {
          if (data && data.message) {
            this.toastr.success(data.message, 'Success!');
            this.router.navigate(['/users']);
          }
        },
        error: (err: any) => {
          this.toastr.error(err.error.message, 'Error!');
        },
      });
    } else {
      this.toastr.error('Please select atleast one file', 'Error!');
    }
  }
}
