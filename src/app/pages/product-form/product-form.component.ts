import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    comparePrice: new FormControl(''),
    barcode: new FormControl(''),
  });

  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      handle: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      grams: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      comparePrice: ['', [Validators.required]],
      barcode: ['', [Validators.required]],
    });
  }

  onSubmitLogin(){
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.productForm.value, null, 2));
  }

}
