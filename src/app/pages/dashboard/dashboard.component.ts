import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from '../../models/product.interface';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  products: ProductInterface[] = []

  constructor(
    private router: Router,
    private service: ProductsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.service.getProducts().subscribe(data => {
      this.products = data
    });
  }

  create() {
    this.router.navigate(['/product']);
  }

  edit(id: any) {
    this.router.navigate(['/product/' + id]);
  }

  delete(id: any) {
    this.service.deleteProduct(id).subscribe(data => {
      this.products = this.products.filter(p => p.id != id);
      this._snackBar.open("Se elimino el producto", '', { duration: 1000 });
    }, error => {
      this._snackBar.open(error.error?.error?.message ?? "Error no definido");
    });
  }
}
