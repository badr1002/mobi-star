import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderCounter: number = 0;
  constructor(private _http: HttpClient, private _router: Router) {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('mac')) {
      _http.get(`/api/order/allOrders`).subscribe((res: any) => {
        if (res.apiStatus) {
          res.data.map((a: any) => {
            if (!a.status) {
              this.orderCounter++;
            }
          });
        }
      });
    }
  }
  addOrder(id: any, color: any): Observable<any> {
    return this._http.post(`/api/order/addOrder`, {
      id,
      color: `${color}`,
    });
  }
  allOrders(): Observable<any> {
    return this._http.get(`/api/order/allOrders`);
  }
  allOrdersForAdmin(): Observable<any> {
    return this._http.get(`/api/order/allOrdersForAdmin`);
  }
  deleteOrder(id: any): Observable<any> {
    return this._http.patch(`/api/order/deleteOrder`, { id });
  }
  completeOrder(id: any, quantity: number): Observable<any> {
    return this._http.patch(`/api/order/completeOrder`, {
      id,
      count: quantity,
    });
  }
}
