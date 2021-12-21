import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../core/services/site-layout/common.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class FeaturesModule {
  constructor(private _commonService: CommonService) {
    this._commonService.placeholder = 'home';
  }
}
