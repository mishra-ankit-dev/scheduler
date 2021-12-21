import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
  @Input('gaugeText') gaugeText: string = '';
  @Input('gaugeValue') gaugeValue: number = 0;
  @Input('colorDistribution') colorDistribution: boolean = true;

  gaugeColor!: {
    'background-color': string | null;
    transform: string;
  };

  constructor() {}

  ngOnInit(): void {
    this.gaugeColor = this.colorDistribution
      ? {
          'background-color':
            0 <= this.gaugeValue && this.gaugeValue <= 25
              ? 'darkgreen'
              : 25 < this.gaugeValue && this.gaugeValue <= 50
              ? 'green'
              : 50 < this.gaugeValue && this.gaugeValue <= 75
              ? 'orange'
              : 75 < this.gaugeValue && this.gaugeValue <= 87.5
              ? 'red'
              : 87.5 < this.gaugeValue && this.gaugeValue <= 100
              ? 'darkred'
              : null,
          transform: 'rotate(' + this.gaugeValue / 200 + 'turn)',
        }
      : {
          'background-color':
            0 <= this.gaugeValue && this.gaugeValue <= 12.5
              ? 'darkred'
              : 12.5 <= this.gaugeValue && this.gaugeValue <= 25
              ? 'red'
              : 25 < this.gaugeValue && this.gaugeValue <= 50
              ? 'orange'
              : 50 < this.gaugeValue && this.gaugeValue <= 75
              ? 'green'
              : 75 < this.gaugeValue && this.gaugeValue <= 100
              ? 'darkgreen'
              : null,
          transform: 'rotate(' + this.gaugeValue / 200 + 'turn)',
        };
  }
}
