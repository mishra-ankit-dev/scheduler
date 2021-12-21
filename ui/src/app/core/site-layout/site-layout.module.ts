import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout.component';
import { MainContentModule } from './main-content/main-content.module';
import { FooterComponent } from './footers/footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeadersModule } from './headers/headers.module';

@NgModule({
  declarations: [SiteLayoutComponent, FooterComponent],
  imports: [CommonModule, MainContentModule, HeadersModule],
  exports: [SiteLayoutComponent, SharedModule],
})
export class SiteLayoutModule {}
