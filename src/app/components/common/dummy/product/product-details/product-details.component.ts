import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/_helpers/data/products';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { CounterService } from '../counter.service';
import { SubService } from '../sub.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [SubService],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor(private subService: SubService) {
    this.subService.getSub().subscribe((ProductDetails) => {
      console.log('Component B', ProductDetails);
    });
  }

  ngOnInit(): void {
    this.subService.getSub().subscribe((ProductDetails) => {
      console.log('Component B', ProductDetails);
    });
  }
}
