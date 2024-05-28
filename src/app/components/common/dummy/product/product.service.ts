import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../../../../_helpers/data/products';

@Injectable()
export class ProductService {
  // Observable  sources
  private productSelected = new Subject<Product>();

  // Observable  streams
  productSelected$ = this.productSelected.asObservable();

  // Service message commands

  selectProduct(product: Product) {
    this.productSelected.next(product);
  }
}
