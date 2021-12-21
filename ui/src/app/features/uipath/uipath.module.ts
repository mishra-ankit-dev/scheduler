import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiPathRoutingModule } from './uipath-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TechnologyDataService } from 'src/app/core/services/technology-data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, UiPathRoutingModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class UiPathModule {
  constructor(private _technologyDataService: TechnologyDataService) {
    this._technologyDataService.currentTechnology = 'uipath';
  }
}
