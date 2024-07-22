import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_services/auth/auth.guard';
import { LayoutComponent } from 'src/app/components/common/core/layouts/layout/layout.component';
import { DashboardComponent } from 'src/app/components/private/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'private',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
})
export class DashboardComponentRoutingModule {}
