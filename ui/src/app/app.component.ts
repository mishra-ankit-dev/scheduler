import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'scheduler-ui';

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any): void {
    document.cookie = 'sessionid' + '=;expires=Thu, 01 Jan 2000 00:00:00 GMT';
    // document.cookie = 'csrftoken' + '=;expires=Thu, 01 Jan 2000 00:00:00 GMT';
  }
}
