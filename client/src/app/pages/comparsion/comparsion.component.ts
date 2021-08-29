import { OrderService } from './../../service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparsion',
  templateUrl: './comparsion.component.html',
  styleUrls: ['./comparsion.component.css'],
})
export class ComparsionComponent implements OnInit {
  mobiles: any[]=[];
  constructor(
    private _user: UserService,
    private _product: ProductService,
    private _order: OrderService
  ) {


     _product.getSingleProduct(_user.comparsion[0]?.product_id).subscribe(
       (res) => {
         if (res.apiStatus) {
           this.mobiles.push(res.data)
         }
       },
       (e) => console.log(e.error)
     );

     _product.getSingleProduct(_user.comparsion[1]?.product_id).subscribe(
       (res) => {
         if (res.apiStatus) {
          this.mobiles.push(res.data);
         }
       },
       (e) => console.log(e.error)
     );

  }

  ngOnInit(): void {}

}
