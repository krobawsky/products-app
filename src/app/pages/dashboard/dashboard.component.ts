import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  
  constructor(
    private service: ProductsService
  ) { }

  ngOnInit() {
    this.service.getProducts();
  }
}
