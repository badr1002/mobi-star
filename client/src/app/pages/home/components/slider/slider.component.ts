import { ProductService } from 'src/app/service/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  apple: any[] = [];
  samsung: any[] = [];
  huawei: any[] = [];
  xiaomi: any[] = [];
  oppo: any[] = [];
  nokia: any[] = [];
  mobiles: any[] = [];
  constructor(private _products: ProductService) {
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
        }
      },
      (err) => console.log(err.error),
      () => {
        if (this.apple.length > 0) this.mobiles.push(this?.apple[0]);
        if (this.samsung.length > 0) this.mobiles.push(this?.samsung[0]);
        if (this.xiaomi.length > 0) this.mobiles.push(this?.xiaomi[0]);
        if (this.oppo.length > 0) this.mobiles.push(this?.oppo[0]);
        if (this.huawei.length > 0) this.mobiles.push(this?.huawei[0]);
        if (this.nokia.length > 0) this.mobiles.push(this?.nokia[0]);
      }
    );
  }

  ngOnInit(): void {}
}
