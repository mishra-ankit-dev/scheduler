import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';

const schedulerRoutes: Routes = [
  { path: '', redirectTo: 'view/all', pathMatch: 'full' },
  { path: 'create', component: CreateScheduleComponent },
  {
    path: 'view/:filter',
    component: ListScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(schedulerRoutes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
