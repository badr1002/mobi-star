import { OrderService } from './service/order.service';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mobi-star';
  arrowStatus: any = true;
  constructor(public _user: UserService, private _route: Router) {
    _user.profile().subscribe(
      (res: any) => {
        if (res.apiStatus) {
          this._user.user = res.data;
          this._user.comparsion = res.data.comparsion;
          console.log(this._user.isAdmin);

        };
        if (!res.data.activate) this._route.navigateByUrl('user/activate');
        return;
      },
      (e) => {
        return false;
      }
    );

    window.onscroll = () => {
      if (window.pageYOffset > 200) this.arrowStatus = true;
      else this.arrowStatus = false;
    };
  }
  goUpHandler = (e:any) => {
    e.preventDefault();
    let p = window.pageYOffset;
    window.scrollTo(0, (p = 0));
  };
}
