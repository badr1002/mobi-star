import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'https://mobi-star.herokuapp.com/api';
  constructor(private _http: HttpClient, private _router: Router) {}
  getAllProducts(): Observable<any> {
    return this._http.get(`${this.url}/product/allProducts`);
  }
  getSingleProduct(id: any): Observable<any> {
    return this._http.post(`${this.url}/product/singleProduct`, { id });
  }

  searchProduct(data: any): Observable<any> {
    return this._http.post(`${this.url}/product/search_term`, { data });
  }

  addProduct(data: any): Observable<any> {
    return this._http.post(`${this.url}/product/addProduct`, data);
  }
  editProduct(id: any, data: any): Observable<any> {
    return this._http.patch(`${this.url}/product/editProduct`, {
      id,
      data: data,
    });
  }
  deleteProduct(id: any): Observable<any> {
    return this._http.patch(`${this.url}/product/deleteProduct`, { id });
  }

  addRate(id: any): Observable<any> {
    return this._http.post(`${this.url}/product/addRate`, { id });
  }
  deleteRate(id: any): Observable<any> {
    return this._http.post(`${this.url}/product/deleteRate`, { id });
  }
}
