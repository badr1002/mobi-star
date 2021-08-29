import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  url = 'http://localhost:5000';
  constructor(private _http: HttpClient, private _router: Router) {}
  getAllRoutes(): Observable<any> {
    return this._http.get(`${this.url}/route/allRoutes`);
  }
  addRoute(roles: any[], url: any): Observable<any> {
    return this._http.post(`${this.url}/route/addRoute`, { roles, url });
  }
  deleteRoute(id: any): Observable<any> {
    return this._http.patch(`${this.url}/route/deleteRoute`, { id });
  }
  deleteRole(id: any, role: any): Observable<any> {
    return this._http.patch(`${this.url}/route/deleteRole`, { id: id, role });
  }
  addRole(id: any, role: any): Observable<any> {
    return this._http.post(`${this.url}/route/addRole`, { id: id, role });
  }
}
