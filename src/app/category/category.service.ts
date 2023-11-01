import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMMON_URL } from '../common/common.url-config';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http:HttpClient) { }

  createCategory(data:any){
    return this.http.post(COMMON_URL.CATEGORY_CREATE,data)
  }
}
