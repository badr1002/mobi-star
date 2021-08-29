import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit, AfterContentChecked {
  //Globale variables
  loading: boolean = false;
  limits: any[] = [5, 10, 20];
  p = 1;
  selectedLimit = 5;
  users: any[] = [];
  copyUsers: any[] = [];
  search_term: any;
  msg:any
  constructor(private _user: UserService) {
    this._user.getAllUsers().subscribe(
      (res) => {
        this.users = res.data.users;
        this.copyUsers = this.users;
      },
      (err) => console.log(err.error),
      () => {
        this.loading = true;
      }
    );
  }
  //Globale Get variables
  get limit() {
    return this.selectedLimit;
  }
  get page() {
    return this.p;
  }

  enableUser(id: any) {
    this._user.enableUser(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          for (let user of this.users) {
            if (user._id == id) user.userStatus = true;
          }
          this.msg = res.msg
        }
      },
      (err) => (this.msg = err.error)
    );
  }
  disableUser(id: any) {
    this._user.disableUser(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          for (let user of this.users) {
            if (user._id == id) user.userStatus = false;
          }
          this.msg = res.msg;
        }
      },
      (err) => (this.msg = err.error)
    );
  }

  //Handle Search
  handleSearch() {
    let filterUsers = this.users.filter((u: any) =>
      u.name.includes(this.search_term)
    );
    this.users = filterUsers;
  }
  ngAfterContentChecked() {
    if (this.search_term == '') {
      this.users = this.copyUsers;
    }
  }
  ngOnInit(): void {}
}
