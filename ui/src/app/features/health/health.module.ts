import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { HealthDetailsComponent } from './health-details/health-details.component';
import { HealthInfoComponent } from './health-details/health-info/health-info.component';
import { HealthDetailComponent } from './health-details/health-detail/health-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HealthDetailsComponent,
    HealthInfoComponent,
    HealthDetailComponent,
  ],
  imports: [CommonModule, SharedModule, HealthRoutingModule],
})
export class HealthModule {}
