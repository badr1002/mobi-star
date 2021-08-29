import { ProductService } from './../../../../service/product.service';
import { UserService } from './../../../../service/user.service';
import { OrderService } from './../../../../service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  users: any[] = [];
  products: any[] = [];
  completedOrders: any[] = [];
  activeOrders: any[] = [];
  stock: any[] = [];
  totalPriceStock: any[] = [];
  totalPaided: any[] = [];
  constructor(
    private _order: OrderService,
    private _user: UserService,
    private _product: ProductService
  ) {
    // get all users
    _user.getAllUsers().subscribe(
      (res) => {
        if (res.apiStatus) {
          this.users = res.data.users;
        }
      },
      (err) => console.log(err.error)
    );
    // get all products
    _product.getAllProducts().subscribe(
      (res) => {
        if (res.apiStatus) {
          this.products = res.data.products;
          for (let product of res.data.products) {
            for (let stock of product.stock) {
              this.stock.push(stock.stock);
              this.totalPriceStock.push(stock.price);
            }
          }
        }
      },
      (err) => console.log(err.error)
    );
    // get all oerders
    _order.allOrdersForAdmin().subscribe(
      (res) => {
        if (res.apiStatus) {
          for (let order of res.data) {
            if (order.status) {
              this.completedOrders.push(order);
              this.totalPaided.push(order.totalPrice);
            } else this.activeOrders.push(order);
          }
        }
      },
      (err) => console.log(err.error)
    );
  }

  get _stock() {
    return this.stock.reduce((a, b) => a + b);
  }
  get _totalPriceStock() {
    return this.totalPriceStock.reduce((a, b) => a + b);
  }
  get _totalPaid() {
    return this.totalPaided.reduce((a, b) => a + b);
  }

  ngOnInit(): void {}
}
