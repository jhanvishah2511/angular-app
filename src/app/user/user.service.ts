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

  userDetails(userId:any){
    return this.http.get(`${COMMON_URL.USER}${userId}`);
  }

  editUser(data:any,userId:any){
    return this.http.post(`${COMMON_URL.USER_EDIT}${userId}`,data);
  }

  deleteId(userId:number){
    return this.http.delete(`${COMMON_URL.USER}${userId}`);
  }

  createUser(data:any){
    return this.http.post(COMMON_URL.USER_CREATE,data);
  }

  verifyToken(token:any){
    return this.http.post(COMMON_URL.USER_VERIFY,token);
  }

  getProfilePic(fileName:any){
    return this.http.get(`${COMMON_URL.PROFILE_PIC}${fileName}`,{ responseType: 'blob' });
  }

  uploadMultiple(data:any, id:number){
    return this.http.post(`${COMMON_URL.MULTI_UPLOAD}${id}`,data);
  }

  getUploads(userId:number){
    return this.http.get(`${COMMON_URL.GET_ALL_UPLOADS}${userId}`);
  }

  getUploadedDocs(fileName:any){
    return this.http.get(`${COMMON_URL.UPLOAD_DOCS}${fileName}`,{ responseType: 'blob' });
  }

  removeImage(userId:number){
    return this.http.delete(`${COMMON_URL.REMOVE_UPLOAD}${userId}`);
  }
}
