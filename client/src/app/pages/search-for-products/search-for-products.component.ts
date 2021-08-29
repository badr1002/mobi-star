import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationStart } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search-for-products',
  templateUrl: './search-for-products.component.html',
  styleUrls: ['./search-for-products.component.css'],
})
export class SearchForProductsComponent implements OnInit {
  p: number = 1;
  collection: any[] = [];
  mobiles: any[] = [];
  msg: any;
  constructor(
    private _products: ProductService,
    private _route: ActivatedRoute,
    private _router:Router
  ) {
    let search_term = _route.snapshot.queryParams.search_term;
    _products.searchProduct(search_term).subscribe(
      (res) => {
        if (res.apiStatus) {
          this.mobiles = res.data
          if (this.mobiles.length <= 0) {
            this.msg = 'This mobile not found!'
          }
        }
      },
      (err) => console.log(err.error)

    )
  }

  ngOnInit(): void {}
}
