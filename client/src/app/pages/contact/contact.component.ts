import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  msg: any;
  alert: any;
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    sub: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  constructor(private _user: UserService) {}

  get _contactData() {
    return this.contactForm.value;
  }
  ngOnInit(): void {}
  handleSendMessgae() {
    if (this.contactForm.valid) {
      this._user.contactMessage(this._contactData).subscribe(
        (res) => {
          if (res.apiStatus) {
            this.alert = 'success';
            this.msg = res.msg;
            setTimeout(() => {
              this.msg = '';
            }, 2000);
          }
        },
        (e) => {
          this.alert = 'danger';
          this.msg = e.error.msg;
           setTimeout(() => {
             this.msg = '';
           }, 2000);
        }
      );
    }
  }
}
