import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit,OnChanges } from '@angular/core';
import { OrderService } from './../../../../service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.css'],
})
export class SingleCompanyComponent implements OnInit, OnChanges {
  mobiles: any[] = [];
  p: number = 1;
  selectedLimit = 8;
  loading: any = false;
  constructor(
    private _products: ProductService,
    private _order: OrderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    let companyName = _route.snapshot.queryParams.name;
    _products.getAllProducts().subscribe(
      (res) => {
        if (res.apiStatus) {
          this.mobiles = res.data.products
            .filter((a: any) => a.companyName == companyName)
            .reverse();
          this.loading = true;
        }
      },
      (err) => (this.loading = false)
    );

  }
  ngOnChanges() {
     let companyName = this._route.snapshot.queryParams.name;
     this._products.getAllProducts().subscribe(
       (res) => {
         if (res.apiStatus) {
           this.mobiles = res.data.products
             .filter((a: any) => a.companyName == companyName)
             .reverse();
           this.loading = true;
         }
       },
       (err) => (this.loading = false)
     );

  }
  ngOnInit(): void {}
}
