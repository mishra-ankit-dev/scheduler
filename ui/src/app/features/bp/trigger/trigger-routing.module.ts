import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTriggerComponent } from './create-trigger/create-trigger.component';
import { ListTriggerComponent } from './list-trigger/list-trigger.component';
import { ViewOrEditTriggerComponent } from './view-or-edit-trigger/view-or-edit-trigger.component';

const triggerRoutes: Routes = [
  { path: '', redirectTo: 'view-all', pathMatch: 'full' },
  {
    path: 'create',
    component: CreateTriggerComponent,
  },
  {
    path: ':id/:mode',
    component: ViewOrEditTriggerComponent,
  },
  {
    path: 'view-all',
    component: ListTriggerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(triggerRoutes)],
  exports: [RouterModule],
})
export class TriggerRoutingModule {}
