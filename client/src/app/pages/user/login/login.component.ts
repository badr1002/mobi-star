import { UserService } from './../../../service/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _user: UserService,
    private _roter: Router,
  ) {}

  ngOnInit(): void {}

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    save: new FormControl(false),
  });
  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }
  get saveMe() {
    return this.login.get('save');
  }

  msg: any;
  handleSubmit() {
    if (this.login.valid) {
      this._user.login(this.login.value).subscribe(
        (res) => {
          if (this.saveMe?.valid) {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('mac', res.data.mac);
          }
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('mac', res.data.mac);
          this._user.isLogin = true;
          
            this._roter.navigateByUrl('/dashboard');
        },
        (err) => {
          this._user.isLogin = false;
          this.msg = err.error.data;
        }
      );
    }
  }
}
