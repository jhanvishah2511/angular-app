import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REGISTRATION_RULES } from '../common/comon-pattern.settings';
import { AuthServiceService } from '../common/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  rules: any = REGISTRATION_RULES;
  submitted: boolean = false;

  constructor(
    public authService: AuthServiceService,
    public toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.rules.EMAIL_PATTERN),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  Submit() {
    this.submitted = true;
    if (this.loginForm.status === 'VALID') {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          if (data && data.data) {
            this.toastr.success(data.message, 'Success!');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.data.id);
            this.router.navigate(['/dashboard'])
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error!');
        },
      });
    }
  }
}
