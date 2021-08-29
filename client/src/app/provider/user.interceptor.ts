import { NavbarComponent } from './../layout/navbar/navbar.component';
import { OrderService } from './../service/order.service';
import { UserService } from './../service/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private _user: UserService) {}

  token: any;
  mac: any;

  setSession() {
    const _token = localStorage.getItem('token');
    const _mac = localStorage.getItem('mac');
    if (_token && _mac) {
      sessionStorage.setItem('token', _token);
      sessionStorage.setItem('mac', _mac);
    }
  }
  getSession() {
    this.token = sessionStorage.getItem('token');
    this.mac = sessionStorage.getItem('mac');
    if (this.token && this.mac) this._user.isLogin = true;
    else this._user.isLogin = false;
  }



  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {

    this.setSession();
    this.getSession();
    request = request.clone({
      headers: new HttpHeaders({
        Authorization: `bearer ${this.token}`,
        Mac: `${this.mac}`,
      }),
    });
    return next.handle(request);
  }
}
