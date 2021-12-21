import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.scss'],
})
export class HealthInfoComponent implements OnInit {
  @Input('healthDetail') healthDetail$!: Observable<IHealthDetail>;

  constructor() {}

  ngOnInit(): void {}
}
