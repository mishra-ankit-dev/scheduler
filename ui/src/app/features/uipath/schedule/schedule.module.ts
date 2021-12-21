import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleComponent } from './list-schedule/schedule/schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';

@NgModule({
  declarations: [
    ScheduleComponent,
    ListScheduleComponent,
    CreateScheduleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class ScheduleModule {}
