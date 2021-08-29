import { ProductService } from './../../../../../service/product.service';
import { RouteService } from './../../../../../service/route.service';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterContentChecked,
} from '@angular/core';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Output() messageEvent: any = new EventEmitter<any>();
  Stock!: FormArray;
  postRoles: any[] = [];
  msg: any;
  alert: any;
  orderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _routes: RouteService,
    private _product: ProductService
  ) {}

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      stock: new FormArray([this.createStockItem()]),
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
  }
  get _Stock() {
    return (this.orderForm.get('stock') as FormArray).controls;
  }
  get _ProductData() {
    return this.orderForm.value;
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
    this.Stock = this.orderForm.get('stock') as FormArray;
    this.Stock.push(this.createStockItem());
  }
  deleteProductFromStock(index: any) {
    if (this._Stock.length > 1) {
      this.Stock.removeAt(index);
    }
  }



  handleSubmit() {
    if (this.orderForm.valid) {
         this._product.addProduct(this._ProductData).subscribe(
           (res) => {
             if (res.apiStatus) {
               this.messageEvent.emit(this.orderForm.value);
               this.alert = 'success';
               this.msg = res.msg;
               //this, this.orderForm.reset();
             }
           },
           (err) => {
             this.msg = err.error.data;
             this.alert = 'danger';
           }
         );
     }
  }
  handleCancel(e: any) {
    e.preventDefault();
    this.messageEvent.emit(false);
  }
}
