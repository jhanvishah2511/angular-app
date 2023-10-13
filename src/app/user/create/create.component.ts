import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { REGISTRATION_RULES } from '../../common/comon-pattern.settings';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  userCreateForm!: FormGroup;
  rules: any = REGISTRATION_RULES;
  submitted: boolean = false;
  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formInitialize();
  }

  formInitialize() {
    this.userCreateForm = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.rules.EMAIL_PATTERN),
      ]),
      password: new FormControl(''),
    });
  }

  Submit() {
    this.submitted = true;
    const password = Math.random().toString(36).slice(-8);
    this.userCreateForm.patchValue({ password: password });
    if (this.userCreateForm.status === 'VALID') {
      this.userService.createUser(this.userCreateForm.value).subscribe({
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
