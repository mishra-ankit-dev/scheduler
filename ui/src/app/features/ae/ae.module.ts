import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AeRoutingModule } from './ae-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TechnologyDataService } from 'src/app/core/services/technology-data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AeRoutingModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AeModule {
  constructor(private _technologyDataService: TechnologyDataService) {
    this._technologyDataService.currentTechnology = 'ae';
  }
}
