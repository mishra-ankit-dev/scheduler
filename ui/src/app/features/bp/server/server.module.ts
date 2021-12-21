import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewOrEditServerComponent } from './view-or-edit-server/view-or-edit-server.component';
import { CreateServerComponent } from './create-server/create-server.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListServerComponent } from './list-server/list-server.component';
import { ServerComponent } from './list-server/server/server.component';

@NgModule({
  declarations: [
    ViewOrEditServerComponent,
    CreateServerComponent,
    ListServerComponent,
    ServerComponent,
  ],
  imports: [
    CommonModule,
    ServerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ServerModule {}
