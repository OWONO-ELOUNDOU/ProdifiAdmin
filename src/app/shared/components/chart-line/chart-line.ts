import { Component, computed, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Charts Module for charts
import { ChartComponent, ApexChart, ApexStroke, ApexXAxis, ApexAxisChartSeries, ApexTitleSubtitle, ApexDataLabels } from 'ng-apexcharts';
import { ReelAsset, VirtualAsset } from '../../models/asset.model';
import { TitleService } from '../../../core/services/Titles/title-service';

interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels
}

@Component({
  selector: 'app-chart-line',
  imports: [ChartComponent, CommonModule],
  templateUrl: './chart-line.html',
  styleUrl: './chart-line.scss'
})
export class ChartLine implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
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

  fetchChartData() {
    this.chartOptions = {
      series: [
        {
          name: "Titres Réels",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Fonds de placement",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
    }
  }
}
