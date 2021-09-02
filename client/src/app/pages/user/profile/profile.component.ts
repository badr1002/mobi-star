import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnChanges {
  user: any;
  image: any;
  file: any ;
  fileName:any
  progress = 0;
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
    _user.profile().subscribe((res) => {
      this.user = res.data;
      this.userForm.get('name')?.setValue(this.user.name);
      this.userForm.get('mobile')?.setValue(this.user.mobile);
      this.userForm.get('about')?.setValue(this.user.about);
      this.userForm.controls['address']
        .get('state')
        ?.setValue(this.user?.address?.state);
      this.userForm.controls['address']
        .get('city')
        ?.setValue(this.user?.address?.city);
      this.userForm.controls['address']
        .get('street')
        ?.setValue(this.user?.address?.street);
      this.userForm.controls['address']
        .get('zipCode')
        ?.setValue(this.user?.address?.zipCode);
      this.image = this._user.user.image?.link;
    });
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
    this.file = ev.target.files[0];
    this.fileName = ev.target.files[0].name
  }
  progressForm = new FormGroup({
    progress: new FormControl(0),
  });

  upFile(x: any) {
    if (this.file) {
      let snap: any;
      this.progressForm.controls['progress'].disable();
      this._user.uploadProfileImage(this.file).on(
        'state_changed',
        (snapshot) => {
          snap = snapshot.ref;
          this.progressForm.controls['progress']?.setValue(
            Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ) + '%'
          );
        },
        (e) => {
          switch (e.code) {
            case 'storage/unauthorized':
              this.alert = 'danger';
              this.msg = " User doesn't have permission to access the object";
              setTimeout(() => {
                this.msg = '';
              }, 2000);
              break;
            case 'storage/canceled':
              this.alert = 'danger';
              this.msg = ' User canceled the upload';
              setTimeout(() => {
                this.msg = '';
              }, 2000);
              break;
            case 'storage/unknown':
              this.alert = 'danger';
              this.msg = 'Unknown error occurred, inspect error.serverResponse';
              setTimeout(() => {
                this.msg = '';
              }, 2000);
              break;
          }
        },
        () => {
          getDownloadURL(snap).then((downloadURL) => {
            this._user.profileImage(this.fileName, downloadURL).subscribe(
              (res) => {
                if (res.apiStatus) {
                  this.image = downloadURL;
                  this._user.user.image = {
                    name: this.fileName,
                    link: downloadURL,
                  };
                  this.alert = 'success';
                  this.msg = res.msg;
                  setTimeout(() => {
                    this.msg = '';
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
          });
          this.file = false;
        }
      );
    }
  }
  handleDeleteProfileImage() {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        this._user.deleteProfileImage(this._user.user.image.name);
        this.image = '';
        this._user.user.image = {
          name: '',
          link: '',
        };
         this.alert = 'success';
         this.msg = ' deleted image successfully';
         setTimeout(() => {
           this.msg = '';
         }, 2000);
      } catch (e) {
        this.alert = 'danger';
        this.msg = 'ERROR: delete image faild!';
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      }
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
            this.msg = '';
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
