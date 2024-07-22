import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/common/core/layouts/layout/layout.component';
import { AuthGuard } from '../../_services/auth/auth.guard';
import { UserAdminComponent } from 'src/app/components/private/user/user-admin/user-admin.component';
import { UserAddComponent } from 'src/app/components/private/user/user-add/user-add.component';

const routes: Routes = [
  {
    path: 'private',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-admin',
        component: UserAdminComponent,
      },
      {
        path: 'user-add',
        component: UserAddComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  declarations: [],
})
export default class UserRoutingModule {}
