import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormMultiService {
  url: string = '/assets/form.json';
  urlHttp: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getFormData() {
    return this.http.get(this.url);
  }

  storeFormData(data: any,key:string) {
    let API_URL = `${this.urlHttp}${key}`;
    
    return this.http.post(API_URL, data);
  }
}
