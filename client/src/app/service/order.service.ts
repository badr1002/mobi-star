import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = `http://localhost:5000/api`;
  orderCounter: number = 0;
  constructor(private _http: HttpClient, private _router: Router) {
    _http.get(`${this.url}/order/allOrders`).subscribe((res: any) => {
      if (res.apiStatus) {
        res.data.map((a: any) => {
          if (!a.status) {
            this.orderCounter++;
          }
        });
      }
    });
  }
  addOrder(id: any, color: any): Observable<any> {
    return this._http.post(`${this.url}/order/addOrder`, {
      id,
      color: `${color}`,
    });
  }
  allOrders(): Observable<any> {
    return this._http.get(`${this.url}/order/allOrders`);
  }
  allOrdersForAdmin(): Observable<any> {
    return this._http.get(`${this.url}/order/allOrdersForAdmin`);
  }
  deleteOrder(id: any): Observable<any> {
    return this._http.patch(`${this.url}/order/deleteOrder`, { id });
  }
  completeOrder(id: any, quantity: number): Observable<any> {
    return this._http.patch(`${this.url}/order/completeOrder`, {
      id,
      count: quantity,
    });
  }
}
