import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthDetailsComponent } from './health-details/health-details.component';

const healthRoutes: Routes = [
  { path: '', redirectTo: '/health/details', pathMatch: 'full' },
  { path: 'details', component: HealthDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(healthRoutes)],
  exports: [RouterModule],
})
export class HealthRoutingModule {}
