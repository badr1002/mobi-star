import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `http://localhost:5000/api`;
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

  profileImage(data: any): Observable<any> {
    return this._http.post(`${this.url}/user/profile`, data);
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
