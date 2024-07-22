import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from '../../components/public/login-form/login-form.component';
import { LoginResolve } from '../../_services/login.resolve';
import { SignupFormComponent } from '../../components/public/signup-form/signup-form.component';

const AuthRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    resolve: {
      ready: LoginResolve,
    },
  },
  {
    path: 'public/login',
    component: LoginFormComponent,
    resolve: {
      ready: LoginResolve,
    },
  },
  {
    path: 'public/signup',
    component: SignupFormComponent,
    resolve: {
      ready: LoginResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(AuthRoutes)],
  declarations: [],
})
export default class AuthRoutingModule {}
