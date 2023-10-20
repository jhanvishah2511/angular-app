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
  previews: string[] = [];
  uploads: string[] = [];
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
          this.getUploads();
        }
      }
    });
  }

  getUploads() {
    this.userService.getUploads(this.userId).subscribe({
      next: (data: any) => {
        if (data && data.data.length > 0) {
          const totalFiles = data.data;
          totalFiles.forEach((element: any) => {
            const fileName = element.document_name;
            if (fileName) {
              this.userService
                .getUploadedDocs(fileName)
                .subscribe((res: any) => {
                  const reader = new FileReader();
                  reader.onload = (e: any) => {
                    this.uploads.push(e.target.result);
                  };
                  reader.readAsDataURL(res);
                });
            }
          });
        }
      },
      error: (err: any) => {},
    });
  }

  multiSelect(event: any) {
    this.multiSelectedFiles = event.target.files;
    this.previews = [];
    if (this.multiSelectedFiles && this.multiSelectedFiles.length > 0) {
      const totalFiles = this.multiSelectedFiles.length;
      for (let index = 0; index < totalFiles; index++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.multiSelectedFiles[index]);
      }
    }
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
