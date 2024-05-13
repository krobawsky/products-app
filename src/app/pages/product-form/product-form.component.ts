import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from '../../models/product.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {

  public productForm: FormGroup = new FormGroup({
    handle: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    sku: new FormControl(''),
    grams: new FormControl(''),
    stock: new FormControl(''),
    price: new FormControl(''),
    compare_price: new FormControl(''),
    barcode: new FormControl(''),
  });

  id = 0;
  submitted = false;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ProductsService,
    private _snackBar: MatSnackBar
  ) { 
    this.activatedRoute.params.subscribe(params=>{
      this.id = params?.['id'] ?? 0;
  });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  ngOnInit() {
    // get product
    if(this.id != 0) {
      this.service.getProduct(this.id).subscribe(resp => {
        console.log(resp)
        this.buildForm(resp)
      });
    } else {
      this.buildForm()
    }
  }

  buildForm(product: ProductInterface | null = null) {
    this.productForm = this.formBuilder.group({
      handle: [product?.handle ?? '', [Validators.required]],
      title: [product?.title ?? '', [Validators.required]],
      description: [product?.description ?? '', [Validators.required]],
      sku: [product?.sku ?? '', [Validators.required]],
      grams: [product?.grams ?? '', [Validators.required]],
      stock: [product?.stock ?? '', [Validators.required]],
      price: [product?.price ?? '', [Validators.required]],
      compare_price: [product?.compare_price ?? '', [Validators.required]],
      barcode: [product?.barcode ?? '', [Validators.required]],
    });
  }

  onChange(event: Event) {
    // Get the new input value
    const newValue = (event.target as HTMLInputElement).value;
    // Perform actions based on the new value
    this.f['handle'].setValue( newValue.toLocaleLowerCase().replaceAll(" ", "-") ?? "")
  }

  onSubmitProduct(){
    this.submitted = true;

    console.log(this.id)
    if (this.productForm.invalid) {
      return;
    }

    console.log(this.id)
    if(this.id != 0) {
      this.service.updateProduct(this.id, this.productForm.value).subscribe(response => {
        this._snackBar.open(response.success.message, '', { duration: 1000 });
      }, error => {
        this._snackBar.open(error.error?.error?.message ?? "Error no definido");
      });
    } else {
      this.service.createProduct(this.productForm.value).subscribe(response => {
        this._snackBar.open(response.success.message, '', { duration: 1000 });
        this.router.navigate(['/']);
      }, error => {
        this._snackBar.open(error.error?.error?.message ?? "Error no definido");
      });
    }
  }

  close() {
    this.router.navigate(['/']);
  }
}
