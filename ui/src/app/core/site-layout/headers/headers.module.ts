import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from './headers.component';
import { PrimaryNavbarComponent } from './primary-navbar/primary-navbar.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';

@NgModule({
  declarations: [
    HeadersComponent,
    PrimaryNavbarComponent,
    HomeNavbarComponent,
    SecondaryNavbarComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HeadersComponent],
})
export class HeadersModule {}
