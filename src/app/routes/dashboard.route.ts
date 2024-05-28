import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/private/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [DashboardComponent, RouterModule.forChild(routes)],
  declarations: [],
})
export class DashboardComponentRoutingModule {}
