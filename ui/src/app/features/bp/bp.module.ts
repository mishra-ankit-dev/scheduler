import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpRoutingModule } from './bp-routing.module';
import { TechnologyDataService } from 'src/app/core/services/technology-data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, BpRoutingModule],
})
export class BpModule {
  constructor(private _technologyDataService: TechnologyDataService) {
    this._technologyDataService.currentTechnology = 'bp';
  }
}
