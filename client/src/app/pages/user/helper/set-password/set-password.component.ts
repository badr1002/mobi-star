import { UserService } from './../../../../service/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
})
export class SetPasswordComponent implements OnInit {
  constructor(private _user: UserService, private route: Router) {}

  ngOnInit(): void {}
  setPass = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl(),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
  });
  get email() {
    return this.setPass.get('email');
  }

  get password() {
    return this.setPass.get('password');
  }

  getEmail: any = true;
  sentCode: any = false;
  setNewPass: any = false;
  msg: any;

  handleSubmit() {
    //alert(this.email?.value)
    if (this.email?.valid) {
      this._user.forgetPassword(this.setPass?.value).subscribe(
        (res) => {
          this.sentCode = true;
          this.getEmail = false;
          this.setNewPass = false;
          this.msg = '';
        },
        (e) => (this.msg = e.error.data)
      );
    } else {
      this.msg = 'Invalid email!'
   }
  }

  handleCheckCode() {
    this._user.checkCode(this.setPass.value).subscribe(
      (res) => {
        this.setNewPass = true;
        this.getEmail = false;
        this.sentCode = false;
        this.msg = '';
      },
      (e) => (this.msg = e.error.msg)
    );
  }

  handleSetPassword() {
    if (this.password?.valid) {
      this._user.setNewPassword(this.setPass.value).subscribe(
        (res) => {
          this.setNewPass = false;
          this.getEmail = true;
          this.sentCode = false;
          this.msg = '';
        },
        (e) => (this.msg = e.error.msg),
        () => this.route.navigateByUrl('/user/login')
      )
    } else {
      this.msg="Invalid password!"
   }
  }
}
