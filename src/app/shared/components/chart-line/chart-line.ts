import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Charts Module for charts
import { ChartComponent, ApexChart, ApexStroke, ApexXAxis, ApexAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { ReelAsset, VirtualAsset } from '../../models/asset.model';
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

  chartData = signal<ReelAsset[]>([]);

  private titleService = inject(TitleService);

  constructor(){

  }

  ngOnInit(): void {
    // On component init, fetch data from the service
    this.fetchData();
  }

  fetchData() {
    try {
      this.titleService.getAllRealTitles().subscribe({
        next: (data) => {
          console.log(data.results);
          this.chartData.set(data.results);
          console.log(this.chartData());
        },
        error: (error) => {
          console.log(error.message);
        }
      })
    } catch (error) {
      console.log('Une erreur est survenue', error);
    }
  }
}
