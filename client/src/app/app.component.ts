import { OrderService } from './service/order.service';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { Component, Input,AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'Mobi-star';
  arrowStatus: any = true;
  screenLoading: any = true;
  constructor(public _user: UserService, private _route: Router) {
    _user.profile().subscribe((res: any) => {
      if (res.apiStatus) {
        this._user.activeStatus = res.data.activate;
        this._user.user = res.data;
        this._user.isLogin = true;
      }
    });

    window.onscroll = () => {
      if (window.pageYOffset > 200) this.arrowStatus = true;
      else this.arrowStatus = false;
    };
  }
  ngAfterViewInit() {
   setTimeout(() => {
      this.screenLoading = false;
   }, 1000);
  }
  goUpHandler = (e: any) => {
    e.preventDefault();
    let p = window.pageYOffset;
    window.scrollTo(0, (p = 0));
  };
}
