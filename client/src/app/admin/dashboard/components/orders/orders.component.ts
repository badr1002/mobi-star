import { OrderService } from './../../../../service/order.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  loading: boolean = false;
  selectedLimit = 5;
  copyOrders: any[]=[];
  orders: any[] = [];
  limits: any[] = [5, 10, 20, 50,100];
  p = 1;
  constructor(private _order: OrderService) {
    _order.allOrdersForAdmin().subscribe((res) => {
      if (res.apiStatus) {
        this.loading = true;
        this.orders = res.data.reverse();
      }
    });
  }

  search_term: any;
  handleSearch() {
    let filterOrders = this.orders.filter((u: any) =>
      u.name.includes(this.search_term)
    );
    this.orders = filterOrders;
  }
  ngAfterContentChecked() {
    if (this.search_term == '') {
      this.orders = this.copyOrders;
    }
  }

  handleDeleteOrder(id: any) {
    if (confirm('Do you really want to delete this product')) {
      this._order.deleteOrder(id).subscribe(
        (res): any => {
          if (res.apiStatus) {
            return (this.orders = this.orders.filter((p) => p._id !== id));
          }
        },
        (err) => alert(err.error.msg)
      );
    }
  }

  ngOnInit(): void {}
}
