import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css'],
})
export class DashNavComponent implements OnInit {
  image: any;
  constructor(public _user: UserService, private _route: Router) {
    _user.profile().subscribe((res) => {
      if (res.apiStatus) {
        this.image = _user.user.image?.link;
      }
    });
  }
  logout(event: any) {
    event.preventDefault();
    if (confirm('Are you sure to logout!')) {
      this._user.logout().subscribe(
        (res) => {
          sessionStorage.clear();
          localStorage.clear();
          this._user.isLogin = false;
          this._user.user = false;
        },
        (err) => {
          return;
        },
        () => this._route.navigateByUrl('user/login')
      );
    }
  }
  ngOnInit(): void {}
}
