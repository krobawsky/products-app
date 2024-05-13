import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../models/product.interface';
import { SuccessResponse } from '../models/success.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient) { }

  getProducts() {
    let token = localStorage.getItem("token") ?? "";
    const headers = 
    { 
      'x-access-token': token,
      'ngrok-skip-browser-warning': environment.ngrok_skip_warning // ignore this line
    }
    environment
    return this.http.get<ProductInterface[]>(environment.product_api + 'api/product', { headers });
  }
  
  getProduct(id: any) {
    let token = localStorage.getItem("token") ?? "";
    const headers = 
    { 
      'x-access-token': token,
      'ngrok-skip-browser-warning': environment.ngrok_skip_warning // ignore this line
    }
    return this.http.get<ProductInterface>(environment.product_api + 'api/product/' + id, { headers });
  }
    
  createProduct(body: any) {
    let token = localStorage.getItem("token") ?? "";
    const headers = 
    { 
      'x-access-token': token,
      'ngrok-skip-browser-warning': environment.ngrok_skip_warning // ignore this line
    }
    return this.http.post<SuccessResponse>(environment.product_api + 'api/product', body, { headers });
  }

  updateProduct(id: any, body: any) {
    let token = localStorage.getItem("token") ?? "";
    const headers = 
    { 
      'x-access-token': token,
      'ngrok-skip-browser-warning': environment.ngrok_skip_warning // ignore this line
    }
    return this.http.put<SuccessResponse>(environment.product_api + 'api/product/' + id, body, { headers });
  }
  
  deleteProduct(id: any) {
    let token = localStorage.getItem("token") ?? "";
    const headers = 
    { 
      'x-access-token': token,
      'ngrok-skip-browser-warning': environment.ngrok_skip_warning // ignore this line
    }
    return this.http.delete(environment.product_api + 'api/product/' + id, { headers });
  }

}
