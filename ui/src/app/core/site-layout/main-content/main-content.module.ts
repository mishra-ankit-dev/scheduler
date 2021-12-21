import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainContentComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [MainContentComponent, SharedModule],
})
export class MainContentModule {}
