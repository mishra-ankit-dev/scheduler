import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDetailsComponent } from './edit-details/edit-details.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent },
  { path: 'edit-details', component: EditDetailsComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'view-profile/:id', component: ViewProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
