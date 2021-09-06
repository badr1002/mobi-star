import { UserService } from 'src/app/service/user.service';
import { ProductService } from './../../service/product.service';
import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
})
export class ShoppingcartComponent implements OnInit {
  orders: any[] = [];
  completedOrders: any[] = [];
  productStock: any[] = [];
  totalPrice: any[] = [];
  total: any = 0;
  totalArray: any[] = [];
  count: number[] = [];
  msg: any;
  constructor(private _order: OrderService, private _product: ProductService,private _user:UserService) {
    // get Completed and non completed orders
    if (this._user.user) {
        _order.allOrders().subscribe((res) => {
          if (res.apiStatus) {
            for (let order of res.data) {
              if (!order.status) this.orders.push(order);
              else this.completedOrders.push(order);
            }
            this.orders.map((o) => {
              this.count.push(o.quantity);
              this.totalPrice.push(o.stock.price);
              this.totalArray.push(o.stock.price);
              this.total = this.totalArray.reduce((a, b) => a + b);
            });
          }
        });
     }
  }

  // get quantity of items for one order
  get _count() {
    return this.count;
  }
  // get total price for one order
  get _totalPriceForItem() {
    return this.totalPrice;
  }
  // get total price for all orders
  get _total() {
    if (this.totalArray.length > 0) {
      return this.totalArray.reduce((a, b) => a + b);
    } else return 0;
  }
  // add quantity of items for one order
  handleIncrement(i: any) {
    this.count[i]++;
    this._totalPriceForItem[i] = this.orders[i].stock.price * this._count[i];
    this.totalArray[i] = this.totalPrice[i];
  }
  // delete quantity of items for one order
  handleDecrement(i: any) {
    if (this.count[i] > 1) {
      this.count[i]--;
      this._totalPriceForItem[i] = this.orders[i].stock.price * this._count[i];
      this.totalArray[i] = this.totalPrice[i];
    }
  }
  // delete an order from orders list
  handleDeleteProductFromShoppingCart(id: any, i: any) {
    this._order.deleteOrder(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          let upadtedOrders = this.orders.filter((o) => o._id != id);
          this.orders = upadtedOrders;
          this._order.orderCounter--;
          this.totalArray.splice(this.totalPrice.indexOf(i), 1);
          this.totalPrice.splice(this._totalPriceForItem.indexOf(i), i);
          this.count.splice(this.count.indexOf(i), 1);
        }
      },
      (err) => console.log(err.error)
    );
  }

  // check out
  checkOut() {
    if (confirm('Are you sure to check out')) {
      for (let order in this.orders) {
        this._order
          .completeOrder(this.orders[order]._id, this._count[order])
          .subscribe(
            (res) => {
              if (res.apiStatus) {
                this._order.orderCounter = 0;
                this.completedOrders = this.orders
                this.orders = [];
              }
            },
            (err) => (this.msg = err.error.msg)
          );
      }
    }
  }
  ngOnInit(): void {}
}
