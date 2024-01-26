import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormMultiService } from '../form-multi.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  multiForm!: FormGroup;

  allData: any;

  showAddress: boolean = false;
  constructor(
    public formMutliService: FormMultiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formIntialize();
    this.formMutliService.getFormData().subscribe((response: any) => {
      this.allData = response;
      this.multiForm.patchValue({
        name: response.name.value,
        email: response.email.value,
        mobile: response.mobile.value,
      });
      if (this.allData.address && this.allData.address.length > 0) {
        this.allData.address.map((data:any)=>{
          this.addAddresses(data);
        })
      }
    });
  }

  submit() {
    if (this.multiForm.status === 'VALID') {
      for (let key in this.multiForm.value) {
        for (let key1 in this.allData) {
          if (
            this.allData.hasOwnProperty(key1) &&
            this.multiForm.value.hasOwnProperty(key) &&
            key === key1
          ) {
            if (key !== 'address') {
              this.allData[key1] = {
                ...this.allData[key1],
                value: this.multiForm.value[key],
              };
            } else {
              this.allData[key1] = this.multiForm.value[key];
            }
            this.formMutliService
              .storeFormData(this.allData[key1], key)
              .subscribe((res: any) => {});
          }
        }
      }
    }
  }

  formIntialize() {
    this.multiForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      address: this.fb.array([]),
    });
  }

  get address(): FormArray {
    return this.multiForm.get('address') as FormArray;
  }

  addAddresses(data?:any) {
    const addAddress = this.multiForm.get('address') as FormArray;
    addAddress.push(
      this.fb.group({
        street: new FormControl(data.street || '', [Validators.required]),
        city: new FormControl(data.city ||'', [Validators.required]),
        zip: new FormControl(data.zip ||'', [Validators.required]),
      })
    );
  }
}
