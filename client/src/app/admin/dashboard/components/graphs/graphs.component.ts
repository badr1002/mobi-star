import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../../service/product.service';
import { UserService } from './../../../../service/user.service';
import { OrderService } from './../../../../service/order.service';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit {
  users: any[] = [];
  products: any[] = [];
  completedOrders: any[] = [];
  activeOrders: any[] = [];

  constructor(
    private _order: OrderService,
    private _user: UserService,
    private _product: ProductService
  ) {
    // get all users
    _user.getAllUsers().subscribe(
      (res) => {
        if (res.apiStatus) {
          this.users = res.data.users.reverse();
        }
      },
      (err) => console.log(err.error)
    );
    // get all products
    _product.getAllProducts().subscribe(
      (res) => {
        if (res.apiStatus) {
          this.products = res.data.products.reverse();

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
            } else this.activeOrders.push(order);
          }
        }
      },
      (err) => console.log(err.error)
    );
  }

  enCoded(id: any) {
    let encId = encodeURIComponent(btoa(id));
    // get id const dec = atob(decodeURIComponent(enc));
    return encId;
  }

  handleDeleteProduct(id: any) {
    if (confirm('Do you really want to delete this product')) {
      this._product.deleteProduct(id).subscribe(
        (res): any => {
          if (res.apiStatus) {
            return (this.products = this.products.filter((p) => p._id !== id));
          }
        },
        (err) => alert(err.error.msg)
      );
    }
  }

  convertDate(date: Date) {
    var d = new Date(date),
      dformat =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
  }

  enableUser(id: any) {
    this._user.enableUser(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          for (let user of this.users) {
            if (user._id == id) user.userStatus = true;
          }

        }
      },

    );
  }
  disableUser(id: any) {
    this._user.disableUser(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          for (let user of this.users) {
            if (user._id == id) user.userStatus = false;
          }

        }
      }

    );
  }

  ngOnInit(): void {}
}
