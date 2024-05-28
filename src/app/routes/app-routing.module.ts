import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/common/core/layouts/layout/layout.component';

import { LoginResolve } from '../_services/login.resolve';
import { AuthGuard } from '../_services/auth/auth.guard';
import { LoginFormComponent } from '../components/public/login-form/login-form.component';
import { SignupFormComponent } from '../components/public/signup-form/signup-form.component';
import { DummyActivityComponent } from '../components/common/dummy/dummy-activity/dummy-activity.component';
import { UserListComponent } from '../components/private/user/user-list/user-list.component';
import { UserAdminComponent } from '../components/private/user/user-admin/user-admin.component';

const routes: Routes = [
  {
    path: 'private',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'activity',
        component: DummyActivityComponent,
      },
    ],
  },
  {
    path: 'private',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-admin',
        component: UserAdminComponent,
      },
    ],
  },
];

const AppRoutes: Routes = [
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

  // {
  //   path: 'private',
  //   component: LayoutComponent,
  //   loadChildren: () =>
  //     import('./../routes/dashboard.route').then(
  //       (m) => m.DashboardComponentRoutingModule
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'projects',
  //   component: LayoutComponent,
  //   loadChildren: () =>
  //     import('./../routes/project.route').then((m) => m.ProjectRoutingModule),
  // },
  // {
  //   path: 'private',
  //   component: LayoutComponent,
  //   loadChildren: () =>
  //     import('./../routes/activity.route').then((m) => m.ActivityRoutingModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
