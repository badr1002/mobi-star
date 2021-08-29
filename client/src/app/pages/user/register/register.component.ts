import { UserService } from './../../../service/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _user: UserService,
    private _roter: Router
  ) {}

  ngOnInit(): void {}

  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    mobile: new FormControl('', [Validators.required]),
    image: new FormControl(),
  });

  get name() {
    return this.register.get('name');
  }
  get email() {
    return this.register.get('email');
  }
  get password() {
    return this.register.get('password');
  }
  get mobile() {
    return this.register.get('mobile');
  }
  get image() {
    return this.register.get('image');
  }

  msg: any;
  handleSubmit() {
    if (this.register.valid) {
      this._user.register(this.register.value).subscribe(
        (res) => {},
        (err) => {
          this.msg = err.error.data;
        },
        () => {
          this._roter.navigateByUrl('/user/login');
        }
      );
    }
  }
}
