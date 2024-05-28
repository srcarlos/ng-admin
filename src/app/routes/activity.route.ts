import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyActivityComponent } from '../components/common/dummy/dummy-activity/dummy-activity.component';

const routes: Routes = [
  {
    path: '',
    component: DummyActivityComponent,
  },
];

@NgModule({
  imports: [DummyActivityComponent, RouterModule.forChild(routes)],
  declarations: [],
})
export class ActivityRoutingModule {}
