import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouteService } from './../../../../../service/route.service';
import { Component, OnInit,AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrls: ['./all-routes.component.css'],
})
export class AllRoutesComponent implements OnInit, AfterContentChecked {
  // Global variables
  loading: boolean = false;
  limits: any[] = [5, 10, 20];
  p = 1;
  selectedLimit = 5;
  routes: any[] = [];
  copyRoutes: any[] = [];
  addRouteForm = false;
  msg: any;
  alert: any;
  addRoleFormStatus: boolean = false;
  popUp: any = '';
  id: any;

  // Add new Role Form Group
  newRoleControl = new FormGroup({
    role: new FormControl('', Validators.required),
  });
  // Edit Role Form Group
  editRoleControl = new FormGroup({
    role: new FormControl('', Validators.required),
  });

  constructor(private _user: RouteService) {
    this._user.getAllRoutes().subscribe(
      (res) => {
        this.routes = res.data;
        this.copyRoutes = this.routes;
      },
      (err) => console.log(err.error),
      () => {
        this.loading = true;
      }
    );
  }

  // get Variables
  get limit() {
    return this.selectedLimit;
  }
  get page() {
    return this.p;
  }
  get _newRole() {
    return this.newRoleControl.get('role')?.value;
  }

  // receiver method from addRouteComponent
  receiveMessage(e: any) {
    if (!e) {
      this.addRouteForm = e;
      return;
    }
    let newRoles: any = [];
    for (let role of e.roles) newRoles.push(role.role);
    let newRoute = {
      roles: newRoles,
      url: e.url,
    };
    this.routes.push(newRoute);
  }

  // Handle Add new Route
  addRoute() {
    this.addRouteForm = true;
  }
  // Handle Delete Route
  deleteRoute(e: any, route: any) {
    e.preventDefault();
    if (confirm(`Do you really want to delete this route(${route.url})`)) {
      this._user.deleteRoute(route._id).subscribe(
        (res): any => {
          if (res.apiStatus) {
            this.alert = 'success';
            this.msg = res.msg;
            let newRoutes = this.routes.filter((r) => r._id !== route._id);
            return (this.routes = newRoutes);
          }
        },
        (err) => {
          this.alert = 'danger';
          this.msg = err.error.msg;
        }
      );
    }
  }

  //Handle Add new Role
  handleAddRole() {
    let thisRoute = this.routes.find((item) => item._id == this.id);
    let newRoutes: any = this.routes;
    let updateRoles: any = thisRoute.roles.push(this._newRole);
    this._user.addRole(this.id, this._newRole).subscribe(
      (res): any => {
        if (res.apiStatus) {
          this.alert = 'success';
          this.msg = res.msg;
          this.cancelAddForm();
          for (let route of newRoutes) {
            if (route == thisRoute) {
              route.roles = updateRoles;
            }
          }
        }
      },
      (err) => {
        this.alert = 'danger';
        this.msg = err.error.msg;
      }
    );
    this.newRoleControl.reset();
  }

  // Handle Delete Role form route.roles
  deleteRole(e: any, id: any, role: any) {
    e.preventDefault();
    let thisRoute = this.routes.find((item) => item._id == id);
    let newRoutes: any = this.routes;
    let updateRoles: any = thisRoute.roles.filter((e: any) => e !== role);
    if (thisRoute.roles.length > 1) {
      if (confirm(`Do you really want to delete this role(${role}) `)) {
        this._user.deleteRole(id, role).subscribe(
          (res): any => {
            if (res.apiStatus) {
              this.alert = 'success';
              this.msg = res.msg;
              for (let route of newRoutes) {
                if (route == thisRoute) {
                  route.roles = updateRoles;
                }
              }
            }
          },
          (err) => {
            this.alert = 'danger';
            this.msg = err.error.msg;
          }
        );
      }
    } else {
      alert('Roles must have lest one role');
      return;
    }
  }

  // Handle Shoe From Role Data
  addFormStatus(id: any): any {
    this.id = id;
    this.addRoleFormStatus = true;
    if (this.addRoleFormStatus) this.popUp = 'popUp';
    else this.popUp = '';
  }
  // Hide Form Role data
  cancelAddForm() {
    this.addRoleFormStatus = false;
  }

  // Handle Edit Role
  editRole(e: any, id: any) {
    e.preventDefault();
    alert(id);
  }

  search_term: any;
  handleSearch() {
    let filterRoutes = this.routes.filter((r: any) =>
      r.url.includes(this.search_term)
    );
    this.routes = filterRoutes;
  }
  ngAfterContentChecked() {
    if (this.search_term === '') {
      this.routes = this.copyRoutes;
    }
  }

  ngOnInit(): void {}
}
