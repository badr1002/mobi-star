import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { OrderService } from './../../../../service/order.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  //pagination
  // *ngFor="let mobile of samsung | paginate: { itemsPerPage: 4, currentPage: p }
  //<pagination-controls (pageChange)="p = $event"></pagination-controls>
  p: number = 1;
  collection: any[] = [];
  apple: any[] = [];
  samsung: any[] = [];
  huawei: any[] = [];
  xiaomi: any[] = [];
  oppo: any[] = [];
  nokia: any[] = [];
  loading:any=false
  constructor(
    private _products: ProductService,
    private _order: OrderService,
    private _user: UserService,
    private _route:Router
  ) {
    _products.getAllProducts().subscribe(
      (res) => {
        if (res.apiStatus) {
          this.apple = res.data.products
            .filter((a: any) => a.companyName == 'apple')
            .reverse();
          this.samsung = res.data.products
            .filter((a: any) => a.companyName == 'samsung')
            .reverse();
          this.huawei = res.data.products
            .filter((a: any) => a.companyName == 'huawei')
            .reverse();
          this.xiaomi = res.data.products
            .filter((a: any) => a.companyName == 'xaiomi')
            .reverse();
          this.oppo = res.data.products
            .filter((a: any) => a.companyName == 'oppo')
            .reverse();
          this.nokia = res.data.products
            .filter((a: any) => a.companyName == 'nokia')
            .reverse();
          this.loading = true;
        }
      },
      (err) => (this.loading = false)
    );
  }

  handleAddProductToCard(id: any, color: any) {
    if (this._user.user) {
      this._order.addOrder(id, color).subscribe((res) => {
        this._order.orderCounter++;
      });
    } else this._route.navigateByUrl('/user/login');
  }
  ngOnInit(): void {}
}
