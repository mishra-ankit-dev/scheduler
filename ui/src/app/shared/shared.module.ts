import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleNavbarComponent } from './components/schedule-navbar/schedule-navbar.component';
import { ServerListPipe } from './pipes/server-list.pipe';
import { JsonToArrayPipe } from './pipes/json-to-array.pipe';
import { TriggerNavbarComponent } from './components/trigger-navbar/trigger-navbar.component';
import { ServerNavbarComponent } from './components/server-navbar/server-navbar.component';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RoutePathPipe } from './pipes/route-path.pipe';
import { AeTriggerNamePipe } from './pipes/ae/ae-trigger-name.pipe';
import { UipathTriggerNamePipe } from './pipes/uipath/uipath-trigger-name.pipe';
import { UipathServerNamePipe } from './pipes/uipath/uipath-server-name.pipe';
import { AeServerNamePipe } from './pipes/ae/ae-server-name.pipe';
import { FilterAeSchedulesPipe } from './pipes/ae/filter-ae-schedules.pipe';
import { FilterUipathSchedulesPipe } from './pipes/uipath/filter-uipath-schedules.pipe';
import { FilterBpSchedulesPipe } from './pipes/bp/filter-bp-schedules.pipe';
import { BpTriggerNamePipe } from './pipes/bp/bp-trigger-name.pipe';
import { BpServerNamePipe } from './pipes/bp/bp-server-name.pipe';
import { HealthNavbarComponent } from './components/health-navbar/health-navbar.component';
import { FilterAeTriggersPipe } from './pipes/ae/filter-ae-triggers.pipe';
import { FilterBpTriggersPipe } from './pipes/bp/filter-bp-triggers.pipe';
import { FilterUipathTriggersPipe } from './pipes/uipath/filter-uipath-triggers.pipe';
import { FilterAeServersPipe } from './pipes/ae/filter-ae-servers.pipe';
import { FilterBpServersPipe } from './pipes/bp/filter-bp-servers.pipe';
import { FilterUipathServersPipe } from './pipes/uipath/filter-uipath-servers.pipe';
import { GaugeComponent } from './components/gauge/gauge.component';
@NgModule({
  declarations: [
    SpinnerComponent,
    LeftSidebarComponent,
    SearchBoxComponent,
    ScheduleNavbarComponent,
    ServerListPipe,
    JsonToArrayPipe,
    TriggerNavbarComponent,
    ServerNavbarComponent,
    TriggerNavbarComponent,
    AuthNavbarComponent,
    HealthNavbarComponent,
    PageNotFoundComponent,
    RoutePathPipe,
    AeServerNamePipe,
    BpServerNamePipe,
    UipathServerNamePipe,
    AeTriggerNamePipe,
    BpTriggerNamePipe,
    UipathTriggerNamePipe,
    FilterAeSchedulesPipe,
    FilterBpSchedulesPipe,
    FilterUipathSchedulesPipe,

    FilterAeTriggersPipe,
    FilterBpTriggersPipe,
    FilterUipathTriggersPipe,

    FilterAeServersPipe,
    FilterBpServersPipe,
    FilterUipathServersPipe,

    GaugeComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    SpinnerComponent,
    LeftSidebarComponent,
    SearchBoxComponent,
    ScheduleNavbarComponent,
    ServerListPipe,
    TriggerNavbarComponent,
    ServerNavbarComponent,
    TriggerNavbarComponent,
    AuthNavbarComponent,
    HealthNavbarComponent,
    PageNotFoundComponent,
    RoutePathPipe,
    AeServerNamePipe,
    BpServerNamePipe,
    UipathServerNamePipe,
    AeTriggerNamePipe,
    BpTriggerNamePipe,
    UipathTriggerNamePipe,
    FilterAeSchedulesPipe,
    FilterBpSchedulesPipe,
    FilterUipathSchedulesPipe,

    FilterAeTriggersPipe,
    FilterBpTriggersPipe,
    FilterUipathTriggersPipe,

    FilterAeServersPipe,
    FilterBpServersPipe,
    FilterUipathServersPipe,

    GaugeComponent,
  ],
})
export class SharedModule {}
