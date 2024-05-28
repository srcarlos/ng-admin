import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AccountStatusPartialComponent } from '../components/private/status.partial';
import { ProjectListComponent } from '../components/common/dummy/project-list/project-list.component';
import { DashboardComponent } from '../components/private/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
];

@NgModule({
  imports: [
    ProjectListComponent,
    RouterModule.forChild(routes),
    DashboardComponent,
  ],
  declarations: [],
})
export class ProjectRoutingModule {}
