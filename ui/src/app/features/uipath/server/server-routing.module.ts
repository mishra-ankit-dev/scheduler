import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateServerComponent } from './create-server/create-server.component';
import { ListServerComponent } from './list-server/list-server.component';
import { ViewOrEditServerComponent } from './view-or-edit-server/view-or-edit-server.component';

const serverRoutes: Routes = [
  { path: '', redirectTo: 'view-all', pathMatch: 'full' },
  {
    path: 'create',
    component: CreateServerComponent,
  },
  {
    path: ':id/:mode',
    component: ViewOrEditServerComponent,
  },
  {
    path: 'view-all',
    component: ListServerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(serverRoutes)],
  exports: [RouterModule],
})
export class ServerRoutingModule {}
