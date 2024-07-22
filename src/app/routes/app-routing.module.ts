import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../components/public/login-form/login-form.component';
import { LoginResolve } from '../_services/login.resolve';
import { SignupFormComponent } from '../components/public/signup-form/signup-form.component';
import AuthRoutingModule from './modules/auth.route';
import { DashboardComponentRoutingModule } from './modules/dashboard.route';
import UserRoutingModule from './modules/user.route';
import { ProjectRoutingModule } from './modules/project.route';
import ActivityRoutingModule from './modules/activity.route';

@NgModule({
  imports: [
    AuthRoutingModule,
    DashboardComponentRoutingModule,
    UserRoutingModule,
    ProjectRoutingModule,
    ActivityRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
