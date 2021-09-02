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
import { backendUrl } from 'src/environments/backendUrl';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = backendUrl;
  activeStatus: any = true;
  isLogin = false;
  isAdmin = false;
  user: any;
  comparsion: any[] = [];
  constructor(private _http: HttpClient, private _router: Router) {}
  login(data: any): Observable<any> {
    return this._http.post(`${this.url}/user/login`, data);
  }
  register(data: any): Observable<any> {
    return this._http.post(`${this.url}/user/register`, data);
  }
  profile(): Observable<any> {
    return this._http.get(`${this.url}/user/me`);
  }
  editProfile(data: any): Observable<any> {
    return this._http.patch(`${this.url}/user/edit`, data);
  }
  dashboard(): Observable<any> {
    return this._http.get(`${this.url}/user/dashboard`);
  }

  profileImage(name: any, link: any): Observable<any> {
    return this._http.patch(`${this.url}/user/profileImage`, {
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
        this._http.patch(`${this.url}/user/deleteProfileImage`, {}).subscribe();
        console.log('deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    return this._http.patch(`${this.url}/user/logout`, {});
  }
  forgetPassword(data: any): Observable<any> {
    return this._http.post(`${this.url}/user/forget/password`, data);
  }

  checkCode(data: any): Observable<any> {
    return this._http.post(`${this.url}/user/check/code`, data);
  }
  setNewPassword(data: any): Observable<any> {
    return this._http.patch(`${this.url}/user/set/password`, data);
  }

  getAllUsers(): Observable<any> {
    return this._http.get(`${this.url}/user/allUsers`);
  }

  enableUser(id: any): Observable<any> {
    return this._http.patch(`${this.url}/user/enableUser`, { id });
  }
  disableUser(id: any): Observable<any> {
    return this._http.patch(`${this.url}/user/disableUser`, { id });
  }
  contactMessage(data: any): Observable<any> {
    return this._http.post(`${this.url}/contact`, data);
  }

  addToComparsion(id: any): Observable<any> {
    return this._http.post(`${this.url}/user/addToComparsion`, { id });
  }
  deleteFromComparsion(id: any): Observable<any> {
    return this._http.patch(`${this.url}/user/deleteFromComparsion`, { id });
  }
}
