import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NavigationEnd, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { REGISTRATION_RULES } from '../../common/comon-pattern.settings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  userEditForm!: FormGroup;
  editData: any;
  rules: any = REGISTRATION_RULES;
  submitted: boolean = false;
  userId: any;
  selectedFiles: any;
  url: any;
  constructor(
    public userService: UserService,
    public router: Router,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    let userId;
    this.router.events.subscribe((event: any) => {
      if (event.routerEvent instanceof NavigationEnd) {
        const currentUrl = event.routerEvent.url;
        userId = currentUrl.split('/');
        const edit = userId.includes('edit');
        const user = userId.includes('users');
        userId = currentUrl.split('/').pop();
        if (edit && user) {
          this.userId = userId;
          this.userDetails(userId);
        }
      }
    });
  }

  userDetails(userId: any) {
    this.userService.userDetails(userId).subscribe((response: any) => {
      if (response && response.data) {
        this.editData = response.data;
        if (this.editData.profile_pic) {
          const fileName = this.editData.profile_pic;
          this.userService.getProfilePic(fileName).subscribe((res: any) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.url = reader.result as string;
            };
            reader.readAsDataURL(res);
          });
        }
        this.formInitialize(this.editData);
      }
    });
  }
  formInitialize(editData: any) {
    this.userEditForm = this.fb.group({
      firstName: new FormControl(this.editData.firstName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(this.editData.lastName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.editData.email, [
        Validators.required,
        Validators.pattern(this.rules.EMAIL_PATTERN),
      ]),
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e: any) => {
        // called once readAsDataURL is completed
        this.url = e.target.result;
      };
    }
  }
  Submit() {
    this.submitted = true;
    if (this.userEditForm.status === 'VALID') {
      const formData = new FormData();
      console.log('frmm', this.userEditForm.value);
      formData.append('email', this.userEditForm.value.email);
      formData.append('firstName', this.userEditForm.value.firstName);
      formData.append('lastName', this.userEditForm.value.lastName);
      if (this.selectedFiles) {
        const file: File = this.selectedFiles.item(0);
        formData.append('profile_pic', file);
      }
      const userEditData = formData;
      this.userService.editUser(userEditData, this.userId).subscribe({
        next: (data: any) => {
          if (data && data.message) {
            this.toastr.success(data.message, 'Success!');
            this.router.navigate(['/users']);
          }
        },
        error: (error) => {
          console.log('sss', error);
        },
      });
    }
  }
}
