import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-user-single-product',
  templateUrl: './user-single-product.component.html',
  styleUrls: ['./user-single-product.component.css'],
})
export class UserSingleProductComponent implements OnInit {
  mobile: any;
  color: any;
  msgColor: any;
  msg: any;
  alert: any = 'danger';
  rates: any[] = [];
  rateStatus: any = false;
  constructor(
    private _product: ProductService,
    private _rotre: ActivatedRoute,
    private _order: OrderService,
    private _user: UserService
  ) {
    let id = _rotre.snapshot.params.id;
    _product.getSingleProduct(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          this.mobile = res.data;
          this.rates = res.data.rates.filter((r: any) => r.rate == true);
          if (res.data.rates.length > 0) {
            this.rateStatus = res.data.rates.filter(
              (r: any) => r.user_id == `${res.user}`
            )[0]?.rate;
          }
        }
      },
      (err) => console.log(err.error)
    );
  }

  handleColor(color: any) {
    this.color = color.value;
  }
  handleAddProductToCard(id: any) {
    if (this.color) {
      this._order.addOrder(id, this.color).subscribe(
        (res) => {
          this.msg = res.msg;
          this.alert = 'success';
          this.msgColor = null;
          this._order.orderCounter++;
        },
        (err) => {
          this.msg = err.error.msg;
          this.alert = 'danger';
          this.msgColor = null;
        }
      );
    } else {
      this.msgColor = 'Please select color!';
    }
  }
  addRate(id: any) {
    this.rateStatus = true;
    this._product.addRate(id).subscribe((res) => {
      if (res.apiStatus) {
        this.rates.push({
          rate: true,
        });
      }
    });
  }
  deleteRate(id: any) {
    this.rateStatus = false;
    this._product.deleteRate(id).subscribe((res) => {
      if (res.apiStatus) {
        this.rates.pop();
      }
    });
  }

  addToCompare(id: any) {
    for (let item of this._user.comparsion) {
      if (item.product_id == id) {
        this.alert = 'danger';
        this.msg = 'already exist!';
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      }
      else if (this._user.comparsion.length >= 2) {
        this._user.comparsion.pop();
      }
      this._user.addToComparsion(id).subscribe(
        (res) => {
          if (res.apiStatus) {
            this._user.comparsion.push(this.mobile);
            this.alert = 'success';
            this.msg = 'added to comparsion successfully!';
            setTimeout(() => {
              this.msg = '';
            }, 2000);
          }
        },
        (e) => {
          this.alert = 'danger';
          this.msg = e.error.msg;
          setTimeout(() => {
            this.msg = '';
          }, 2000);
        }
      );
    }
  }
  ngOnInit(): void {}
}
