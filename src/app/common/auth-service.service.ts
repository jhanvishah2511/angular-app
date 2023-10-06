import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {COMMON_URL} from '../common/common.url-config';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {}
  register(data:any): Observable<any> {
    return this.http.post(COMMON_URL.REGISTER,data);
  }

  login(data:any): Observable<any>{
    return this.http.post(COMMON_URL.LOGIN,data);
  }

  logout(){
    return this.http.get(COMMON_URL.LOGOUT);
  }
}
