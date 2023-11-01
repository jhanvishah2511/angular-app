import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  categoryCreateForm!: FormGroup;
  submitted: boolean = false;
  selectedFiles: any;
  url: any;
  constructor(
    public fb: FormBuilder,
    public categoryService: CategoryService,
    public toastr: ToastrService,
    public router: Router
  ) {}
  ngOnInit() {
    this.formInitialize();
  }

  formInitialize() {
    this.categoryCreateForm = this.fb.group({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      categoryStatus: new FormControl('active', [Validators.required]),
    });
  }

  submit() {
    this.submitted = true;
    if (this.categoryCreateForm.status === 'VALID') {
      const formData = new FormData();
      formData.append(
        'categoryName',
        this.categoryCreateForm.value.categoryName
      );
      let status: any;
      if (this.categoryCreateForm.value.categoryStatus === 'active') {
        status = true;
      } else {
        status = false;
      }
      formData.append('categoryStatus', status);
      if (this.selectedFiles) {
        const file: File = this.selectedFiles.item(0);
        formData.append('categoryImage', file);
      }
      const categoryData = formData;
      this.categoryService.createCategory(categoryData).subscribe({
        next: (data: any) => {
          if (data && data.message) {
            this.toastr.success(data.message, 'Success!');
            this.router.navigate(['/categories']);
          }
        },
        error: (err: any) => {
          this.toastr.error(err.error.message, 'Success!');
        },
      });
    }
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e: any) => {
        // called once readAsDataURL is completed
        this.url = e.target.result;
      };
    }
  }
}
