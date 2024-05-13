import { ProductInterface } from "./product.interface";

export interface SuccessResponse {
  success: SuccessInterface;
  data:    ProductDataInterface;
}

export interface SuccessInterface {
  code:    string;
  message: string;
  title:   string;
}

export interface ProductDataInterface {
  product: ProductInterface;
}
