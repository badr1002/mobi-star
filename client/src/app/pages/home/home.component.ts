import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _user:UserService) {
 _user.profile().subscribe((res: any) => {
   if (res.apiStatus) {
     this._user.activeStatus = res.data.activate;
     this._user.user = res.data;
     this._user.isLogin = true;
   }
 });
  }

  ngOnInit(): void {}
}
