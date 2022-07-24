import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient, private _router: Router) {}
  getAllProducts(): Observable<any> {
    return this._http.get(`/api/product/allProducts`);
  }
  getSingleProduct(id: any): Observable<any> {
    return this._http.post(`/api/product/singleProduct`, { id });
  }

  searchProduct(data: any): Observable<any> {
    return this._http.post(`/api/product/search_term`, { data });
  }

  addProduct(data: any): Observable<any> {
    return this._http.post(`/api/product/addProduct`, data);
  }
  editProduct(id: any, data: any): Observable<any> {
    return this._http.patch(`/api/product/editProduct`, {
      id,
      data: data,
    });
  }
  deleteProduct(id: any): Observable<any> {
    return this._http.patch(`/api/product/deleteProduct`, { id });
  }

  addRate(id: any): Observable<any> {
    return this._http.post(`/api/product/addRate`, { id });
  }
  deleteRate(id: any): Observable<any> {
    return this._http.post(`/api/product/deleteRate`, { id });
  }
}
