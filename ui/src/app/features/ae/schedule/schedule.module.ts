import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { ScheduleComponent } from './list-schedule/schedule/schedule.component';
@NgModule({
  declarations: [
    CreateScheduleComponent,
    ListScheduleComponent,
    ScheduleComponent,
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
