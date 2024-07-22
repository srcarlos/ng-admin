import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_services/auth/auth.guard';
import { LayoutComponent } from 'src/app/components/common/core/layouts/layout/layout.component';
import { ProjectListComponent } from 'src/app/components/common/dummy/project-list/project-list.component';

const routes: Routes = [
  {
    path: 'private',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'project',
        component: ProjectListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
})
export class ProjectRoutingModule {}
