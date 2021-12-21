import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriggerRoutingModule } from './trigger-routing.module';
import { CreateTriggerComponent } from './create-trigger/create-trigger.component';
import { ViewOrEditTriggerComponent } from './view-or-edit-trigger/view-or-edit-trigger.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListTriggerComponent } from './list-trigger/list-trigger.component';
import { TriggerComponent } from './list-trigger/trigger/trigger.component';

@NgModule({
  declarations: [
    CreateTriggerComponent,
    ViewOrEditTriggerComponent,
    ListTriggerComponent,
    TriggerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TriggerRoutingModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class TriggerModule {}
