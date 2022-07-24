import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeStatus: any = true;
  isLogin = false;
  isAdmin = false;
  user: any;
  comparsion: any[] = [];
  constructor(private _http: HttpClient, private _router: Router) {}
  login(data: any): Observable<any> {
    return this._http.post(`/api/user/login`, data);
  }
  register(data: any): Observable<any> {
    return this._http.post(`/api/user/register`, data);
  }
  profile(): Observable<any> {
    return this._http.get(`/api/user/me`);
  }
  editProfile(data: any): Observable<any> {
    return this._http.patch(`/api/user/edit`, data);
  }
  dashboard(): Observable<any> {
    return this._http.get(`/api/user/dashboard`);
  }

  profileImage(name: any, link: any): Observable<any> {
    return this._http.patch(`/api/user/profileImage`, {
      name: name,
      link: link,
    });
  }

  uploadProfileImage(file: File) {
    const metadata = {
      contentType: 'image/jpeg',
      size: 2097152,
    };
    const filePath = `/profileImage/${this.user._id + '_' + file.name}`;
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    return uploadTask;
  }
  deleteProfileImage(fileName: any) {
    const storage = getStorage();
    const filePath = `profileImage/${this.user._id + '_' + fileName}`;
    const desertRef = ref(storage, filePath);

    deleteObject(desertRef)
      .then(() => {
        this._http.patch(`/api/user/deleteProfileImage`, {}).subscribe();
        console.log('deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    return this._http.patch(`/api/user/logout`, {});
  }
  forgetPassword(data: any): Observable<any> {
    return this._http.post(`/api/user/forget/password`, data);
  }

  checkCode(data: any): Observable<any> {
    return this._http.post(`/api/user/check/code`, data);
  }
  setNewPassword(data: any): Observable<any> {
    return this._http.patch(`/api/user/set/password`, data);
  }

  getAllUsers(): Observable<any> {
    return this._http.get(`/api/user/allUsers`);
  }

  enableUser(id: any): Observable<any> {
    return this._http.patch(`/api/user/enableUser`, { id });
  }
  disableUser(id: any): Observable<any> {
    return this._http.patch(`/api/user/disableUser`, { id });
  }
  contactMessage(data: any): Observable<any> {
    return this._http.post(`/api/contact`, data);
  }

  addToComparsion(id: any): Observable<any> {
    return this._http.post(`/api/user/addToComparsion`, { id });
  }
  deleteFromComparsion(id: any): Observable<any> {
    return this._http.patch(`/api/user/deleteFromComparsion`, { id });
  }
}
