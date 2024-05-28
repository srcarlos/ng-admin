import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, products } from '../../../../../_helpers/data/products';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../product.service';
import { CounterService } from '../counter.service';
import { SubService } from '../sub.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, ProductAlertsComponent, ProductDetailsComponent],
  providers: [ProductService, CounterService],
})
export class ProductListComponent {
  @Input() products = [...products];
  @Input() searchFilter: string = '';
  @Output() selectedEmitter = new EventEmitter<Product>();
  @Output() newItemEvent = new EventEmitter<Product>();
  currentProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private counterService: CounterService,
    private subService: SubService
  ) {}

  share(currentProduct: Product) {
    console.log('share');
    this.onSelect(currentProduct);
    this.sendValue(10);
  }

  view(currentProduct: Product) {
    console.log('view');
    this.subService.setSub(currentProduct);
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  onSelect(currentProduct: Product) {
    this.subService.setSub(currentProduct);
    console.log('onSelect');
    this.currentProduct = currentProduct;
    this.productService.selectProduct(this.currentProduct);
    this.selectedEmitter.emit(currentProduct);
    this.newItemEvent.emit(currentProduct);
  }

  sendValue(value: number) {
    this.counterService.setCounter(value);
  }
}
