import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { COMMON_URL } from '../common/common.url-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  getUser(){
    return this.http.get(COMMON_URL.USER);
  }
}
