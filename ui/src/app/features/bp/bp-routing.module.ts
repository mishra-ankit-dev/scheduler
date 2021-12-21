import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const bpRoutes: Routes = [
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  {
    path: 'trigger',
    loadChildren: () =>
      import('./trigger/trigger.module').then((m) => m.TriggerModule),
  },
  {
    path: 'server',
    loadChildren: () =>
      import('./server/server.module').then((m) => m.ServerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(bpRoutes)],
  exports: [RouterModule],
})
export class BpRoutingModule {}
