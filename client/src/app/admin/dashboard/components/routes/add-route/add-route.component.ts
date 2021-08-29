import { RouteService } from './../../../../../service/route.service';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterContentChecked,
} from '@angular/core';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css'],
})
export class AddRouteComponent implements OnInit {
  @Output() messageEvent: any = new EventEmitter<any>();
  Roles!: FormArray;
  constructor(
    private formBuilder: FormBuilder,
    private _routes: RouteService
  ) {}
  orderForm: FormGroup = new FormGroup({
    url: new FormControl('', Validators.required),
    roles: new FormArray([this.createRole()]),
  });
  ngOnInit() {}
  get _Roles() {
    return this.orderForm.get('roles')?.value;
  }
  get _Url() {
    return this.orderForm.get('url')?.value;
  }
  createRole(): FormGroup {
    return this.formBuilder.group({
      role: '',
    });
  }
  addRole(): void {
    this.Roles = this.orderForm.get('roles') as FormArray;
    this.Roles.push(this.createRole());
  }
  deleteRole(index: any) {
    if (this._Roles.length > 1) {
      this.Roles.removeAt(index);
    }
  }

  postRoles: any[] = [];
  msg: any;
  alert: any;
  handleSubmit() {
    for (let role of this._Roles) this.postRoles.push(role.role);
    if (this.orderForm.valid && this._Roles[0].role != '') {
      this._routes.addRoute(this.postRoles, this._Url).subscribe(
        (res) => {
          if (res.apiStatus) {
            this.messageEvent.emit(this.orderForm.value);
            this.alert = "success"
            this.msg = res.msg;
            this, this.orderForm.reset();
          }
        },
        (err) => {
          this.msg = err.error.data
           this.alert = 'danger';
        }
      );
      this.postRoles=[]
    }
  }
  handleCancel(e: any) {
    e.preventDefault();
    this.messageEvent.emit(false);
  }
}
