import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnChanges {
  user: any;
  image: any = 'https://bootdey.com/img/Content/avatar/avatar7.png';
  path: any = '../../../../assets//uploads/profileImage/';
  file: any = null;
  uploadTitle: any;
  aboutFormStatus: any = false;
  msg: any;
  alert: any;
  userForm = new FormGroup({
    name: new FormControl(``, Validators.required),
    mobile: new FormControl(``, Validators.required),
    about: new FormControl(``),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      street: new FormControl(''),
      zipCode: new FormControl(''),
    }),
    oldPassword: new FormControl(``),
    password: new FormControl(``),
  });

  constructor(private _user: UserService) {
    _user.profile().subscribe(
      (res) => {
        this.user = res.data;
        this.userForm.get('name')?.setValue(this.user.name);
        this.userForm.get('mobile')?.setValue(this.user.mobile);
        this.userForm.get('about')?.setValue(this.user.about);
        this.userForm.controls['address'].get('state')?.setValue(this.user?.address?.state)
         this.userForm.controls['address']
           .get('city')
           ?.setValue(this.user?.address?.city);
         this.userForm.controls['address']
           .get('street')
           ?.setValue(this.user?.address?.street);
         this.userForm.controls['address']
           .get('zipCode')
           ?.setValue(this.user?.address?.zipCode);
        this.image = this.path + res.data._id + '_' + res.data.image;
      }
    );
  }
  get _userData() {
    return {
      name: this.userForm.get('name')?.value,
      mobile: this.userForm.get('mobile')?.value,
      oldPassword: this.userForm.get('oldPassword')?.value,
      password: this.userForm.get('password')?.value,
      about: this.userForm.get('about')?.value,
      address: {
        state: this.userForm.controls['address'].get('state')?.value,
        street: this.userForm.controls['address'].get('street')?.value,
        city: this.userForm.controls['address'].get('city')?.value,
        zipCode: this.userForm.controls['address'].get('zipCode')?.value,
      },
    };
  }


  ngOnChanges(): any {}

  handleFile(ev: any) {
    this.file = ev.target.files;
    this.uploadTitle = ev.target.files[0].name;
  }

  upFile(x: any) {
    if (this.file != null) {
      let formData = new FormData();
      formData.append('image', this.file[0]);
      this._user.profileImage(formData).subscribe(
        (res) => {
          this.image = this.path + res.data._id + '_' + res.data.image;
        },
        (err) => console.log(err.error)
      );
    }
  }


  handleUpdate(e: any) {
    e.preventDefault();
     this._user.editProfile(this._userData).subscribe(
       (res) => {
         if (res.apiStatus) {
            this.alert = 'success';
            this.msg = res.msg;
           setTimeout(() => {
             this.msg=""
          }, 2000);

         }
       },
       (err) => {
         this.alert = 'danger';
        this.msg = err.error.msg;
         setTimeout(() => {
           this.msg = '';
         }, 2000);

       }
     );
  }
  ngOnInit(): void {}
}
