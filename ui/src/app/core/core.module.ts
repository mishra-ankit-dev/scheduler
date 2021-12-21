import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutModule } from './site-layout/site-layout.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SiteLayoutModule],
  exports: [SiteLayoutModule, SharedModule],
})
export class CoreModule {}
