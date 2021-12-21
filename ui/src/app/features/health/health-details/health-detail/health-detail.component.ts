import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthDetailsService } from 'src/app/core/services/health/health-details.service';

@Component({
  selector: 'app-health-detail',
  templateUrl: './health-detail.component.html',
  styleUrls: ['./health-detail.component.scss'],
})
export class HealthDetailComponent implements OnInit {
  @Input('server') server!: IAEServer | IBPServer | IUiPathServer;
  serverHealthDetail$!: Observable<IHealthDetail>;

  constructor(private _healthDetailService: HealthDetailsService) {}

  ngOnInit(): void {
    this.serverHealthDetail$ = this._healthDetailService.GetHealthDetails(
      this.server
    );
  }
}
