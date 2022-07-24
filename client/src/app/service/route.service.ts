import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private _http: HttpClient, private _router: Router) {}
  getAllRoutes(): Observable<any> {
    return this._http.get(`/api/route/allRoutes`);
  }
  addRoute(roles: any[], url: any): Observable<any> {
    return this._http.post(`/api/route/addRoute`, { roles, url });
  }
  deleteRoute(id: any): Observable<any> {
    return this._http.patch(`/api/route/deleteRoute`, { id });
  }
  deleteRole(id: any, role: any): Observable<any> {
    return this._http.patch(`/api/route/deleteRole`, { id: id, role });
  }
  addRole(id: any, role: any): Observable<any> {
    return this._http.post(`/api/route/addRole`, { id: id, role });
  }
}
