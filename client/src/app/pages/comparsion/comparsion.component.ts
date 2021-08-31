import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparsion',
  templateUrl: './comparsion.component.html',
  styleUrls: ['./comparsion.component.css'],
})
export class ComparsionComponent implements OnInit {
  mobiles: any[] = [];
  constructor(private _user: UserService, private _product: ProductService) {
    _user.profile().subscribe((res: any) => {
      if (res.apiStatus) {
        this._user.comparsion = res.data.comparsion;
        if (this.id_1) {
          _product.getSingleProduct(this.id_1).subscribe((res) => {
            if (res.apiStatus) {
              this.mobiles.push(res.data);
            }
          });
        }
        if (this.id_2) {
          _product.getSingleProduct(this.id_2).subscribe((res) => {
            if (res.apiStatus) {
              this.mobiles.push(res.data);
            }
          });
        }
      }
    });
  }
  get id_1() {
    return this._user.comparsion[0]?.product_id;
  }
  get id_2() {
    return this._user.comparsion[1]?.product_id;
  }
  handleDelete(i: any) {
    this._user.deleteFromComparsion(this._user.comparsion[i]._id).subscribe(
      (res) => {
        if (res.apiStatus) {
          this.mobiles.splice(i,1)
        }
      }
    )
  }
  ngOnInit(): void {}
}
