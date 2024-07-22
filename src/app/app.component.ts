import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { first, switchMap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Product } from './_helpers/data/products';
import { ProductService } from './components/common/dummy/product/product.service';
import { CounterService } from './components/common/dummy/product/counter.service';
import { SubService } from './components/common/dummy/product/sub.service';
import { LayoutComponent } from './components/common/core/layouts/layout/layout.component';
import { ToolbarComponent } from './components/common/core/layouts/layout/toolbar/toolbar.component';

import { AccountStatusPartialComponent } from './components/private/dashboard/status.partial';
import { AuthState } from './_services/auth/auth.state';
import { AccountService } from './_services/auth/account.service';
import { AuthService } from './_services/auth/auth.service';

import { LoginFormComponent } from './components/public/login-form/login-form.component';
import { SignupFormComponent } from './components/public/signup-form/signup-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    LayoutComponent,
    ToolbarComponent,
    CommonModule,
    RouterOutlet,
    AccountStatusPartialComponent,
    LoginFormComponent,
    SignupFormComponent,
    RouterModule,
  ],
  providers: [ProductService, CounterService, SubService],
})
export class AppComponent implements OnInit {
  title = 'ng-admin';
  filterText: string = 'XL';
  @Input() product: Product | undefined;
  @Input() counter: number | undefined;
  productTest: Product | undefined;
  //subscription: Subscription;

  constructor(
    private subService: SubService,
    private authState: AuthState,
    private accountService: AccountService,
    private authService: AuthService
  ) {
    this.subService.getSub().subscribe((ProductDetails) => {
      console.log('Component A', ProductDetails);
      this.product = ProductDetails;
    });

    // in here, tap into authstate to watch when it becomes available,
    // and request more info from account
    // do it just once through out a session
    this.authState.stateItem$
      .pipe(
        first((state) => state !== null),
        switchMap((state) => this.accountService.GetAccount())
      )
      .subscribe({
        next: (response) => {
          // here you should set account state if you have it
          // then you can use it elsewhere
          // this.accountState.SetState(response);
        },
      });
  }

  addItem(newItem: Product) {
    this.productTest = newItem;
  }

  onSelected(product: Product) {
    this.product = product;
  }
  onClick() {}

  ngOnInit(): void {}
}
