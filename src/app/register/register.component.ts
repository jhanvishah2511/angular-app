import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REGISTRATION_RULES } from '../common/comon-pattern.settings';
import { AuthServiceService } from '../common/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signUpForm!: FormGroup;
  submitted: boolean = false;
  rules: any = REGISTRATION_RULES;

  constructor(
    public authService: AuthServiceService,
    public toastr: ToastrService,
    public router:Router
  ) {}
  ngOnInit() {
    this.signUpForm = new FormGroup({
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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      cpassword: new FormControl('', [Validators.required]),
    });
  }
  checkPassword() {
    if (this.signUpForm.value.cpassword !== this.signUpForm.value.password) {
      this.signUpForm.controls['cpassword'].setErrors({ passwordMatch: true });
    } else {
      this.signUpForm.controls['cpassword'].setErrors(null);
    }
  }
  Submit() {
    this.submitted = true;
    if (this.signUpForm.status === 'VALID') {
      this.authService.register(this.signUpForm.value).subscribe({
        next: (data) => {
          if(data.data){
            this.toastr.success(data.message, 'Success!');
            this.router.navigate(['/login'])
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error!');
        },
      });
    }
  }
}
