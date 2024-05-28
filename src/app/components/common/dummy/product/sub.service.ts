import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product, products } from '../../../../_helpers/data/products';
@Injectable({
  providedIn: 'root',
})
export class SubService {
  // Observable  sources
  private productSelected = new Subject<Product>();

  constructor() {
    this.productSelected.subscribe((x) => {
      console.log('SubService', x);
    });
  }
  getSub() {
    return this.productSelected;
  }

  setSub(product: Product) {
    this.productSelected.next(product);
  }
}
