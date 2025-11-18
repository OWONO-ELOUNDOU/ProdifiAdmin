import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Charts Module for charts
import { ChartComponent, ApexChart, ApexStroke, ApexXAxis, ApexAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { VirtualAsset } from '../../models/asset.model';
import { TitleService } from '../../../core/services/Titles/title-service';

interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
}

@Component({
  selector: 'app-chart-line',
  imports: [ChartComponent, CommonModule],
  templateUrl: './chart-line.html',
  styleUrl: './chart-line.scss'
})
export class ChartLine implements OnInit {
  chartOptions!: ChartOptions;

  chartData = signal<VirtualAsset[]>([]);

  private titleService = inject(TitleService);

  constructor(){

  }

  ngOnInit(): void {
    // On component init, fetch data from the service
    this.fetchData();

  }

  fetchData() {
    
  }
}
