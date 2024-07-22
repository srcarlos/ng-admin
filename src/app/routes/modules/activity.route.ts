import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../components/common/core/layouts/layout/layout.component';
import { AuthGuard } from '../../_services/auth/auth.guard';
import { ActivityComponent } from 'src/app/activity/activity.component';

const routes: Routes = [
  {
    path: 'private',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'activity',
        component: ActivityComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
})
export default class ActivityRoutingModule {}
