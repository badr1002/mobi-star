import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  product: any;
  Stock!: FormArray;
  postRoles: any[] = [];
  msg: any;
  alert: any;

  constructor(
    private _product: ProductService,
    private snapshot: ActivatedRoute,
    private _route: Router
  ) {
     const id = atob(decodeURIComponent(this.snapshot.snapshot.queryParams.id));
     this._product.getSingleProduct(id).subscribe(
       (res) => {
         this.product = res.data;
         this.productForm.get('name')?.setValue(this.product.name);
         this.productForm.get('companyName')?.setValue(this.product.companyName);
         this.productForm.controls['features'].get('cpu')?.setValue(this.product.features.cpu);
         this.productForm.controls['features'].get('frontCam')?.setValue(this.product.features.frontCam);
         this.productForm.controls['features'].get('backCam')?.setValue(this.product.features.backCam);
         this.productForm.controls['features'].get('battery')?.setValue(this.product.features.battery);
         for (let s in this.product.stock) {
           (this.productForm.get('stock') as FormArray).controls.push(
             this.createStockItem()
           );
           this._Stock[parseInt(s)]?.get('color')?.setValue(this.product.stock[s].color);
            this._Stock[parseInt(s)]
              ?.get('color')
              ?.setValue(this.product.stock[s].color);
            this._Stock[parseInt(s)]
              ?.get('ram')
              ?.setValue(this.product.stock[s].ram);
            this._Stock[parseInt(s)]
              ?.get('memory')
              ?.setValue(this.product.stock[s].memory);
            this._Stock[parseInt(s)]
              ?.get('price')
              ?.setValue(this.product.stock[s].price);
              this._Stock[parseInt(s)]
                ?.get('image')
                ?.setValue(this.product.stock[s].image);
            this._Stock[parseInt(s)]
              ?.get('stock')
              ?.setValue(this.product.stock[s].stock);
         }
       },
       (err) => {
         console.log(err.error);
       }
     );
  }

  productForm = new FormGroup({
    name: new FormControl(``, Validators.required),
    companyName: new FormControl('', Validators.required),
    stock: new FormArray([]),
    features: new FormGroup({
      cpu: new FormControl('', Validators.required),
      frontCam: new FormControl('', [Validators.required]),
      backCam: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
      battery: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
    }),
  });

  ngOnInit(): void {
}
  get _Stock() {
    return (this.productForm.get('stock') as FormArray).controls;
  }
  get _ProductData() {
    return this.productForm.value;
  }

  createStockItem() {
    return new FormGroup({
      color: new FormControl('', Validators.required),
      ram: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
      memory: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
      image: new FormControl(''),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
    });
  }
  addNewProductToStock(): void {
    this.Stock = this.productForm.get('stock') as FormArray;
    this.Stock.push(this.createStockItem());
  }
  deleteProductFromStock(index: any) {
    if (this._Stock.length > 1) {
      this.Stock.removeAt(index);
    }
  }

  handleSubmit() {
    if (this.productForm.valid) {
      this._product.editProduct(this.product._id, this._ProductData).subscribe(
        (res) => {
          if (res.apiStatus) {
            this.alert = "success"
            this.msg = res.msg
            setTimeout(() => {
              this.msg=''
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

      )
      console.log(this._ProductData);

    }
  }
}
