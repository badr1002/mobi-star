import { FormGroup, FormControl } from '@angular/forms';
import { OrderService } from './../../service/order.service';
import { UserService } from './../../service/user.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit,AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterContentChecked {
  counter: number
  image: any
  constructor(
    public _user: UserService,
    private _route: Router,
    public _order: OrderService
  ) {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('mac')) {
        _user.profile().subscribe((res) => {
          if (res.apiStatus) {
            this.image = res.data.image?.link;
          }
        });
     }

  }

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  get search_term() {
    return this.searchForm.get('search')?.value;
  }

  handleSearch() {
    if (this.search_term != '') {
      window.location.assign(`/search?search_term=${this.search_term}`);
    }
  }
  ngAfterContentChecked() {
    this.counter = this._order.orderCounter;
  }
  logout(event: any) {
    event.preventDefault();
    if (confirm('Are you sure to logout!')) {
      this._user.logout().subscribe(
        (res:any) => {
          if (res.apiStatus) {
            sessionStorage.clear();
            localStorage.clear();
            this._user.isLogin = false;
            this._user.isAdmin = false;
            this._user.user = false;
            this._route.navigateByUrl('user/login');
         }
        }
      );
    }
  }

  ngOnInit(): void {}

}
