import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  BrowserModule,
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app/routes/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthState } from './app/_services/auth/auth.state';
import { AppInterceptor } from './app/_helpers/http.interceptor';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './app/material/material.module';

// add a provider to array of providers
const CoreProviders = [
  {
    provide: APP_INITIALIZER,
    // dummy factory
    useFactory: () => () => {},
    multi: true,
    // injected depdencies, this will be constructed immidiately
    deps: [AuthState],
  },
  // you might want to add a configuration service
  // add interceptors
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AppInterceptor,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule
    ),
    provideClientHydration(),
    ...CoreProviders,
  ],
}).catch((err) => console.error(err));
