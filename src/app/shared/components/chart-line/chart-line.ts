import { Component, computed, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Charts Module for charts
import { ChartComponent, ApexChart, ApexStroke, ApexXAxis, ApexAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { ReelAsset, VirtualAsset } from '../../models/asset.model';
import { TitleService } from '../../../core/services/Titles/title-service';

interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
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

    this.chartOptions = {
      series: [
        {
          name: "My series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
        {
          name: "My time",
          data: [20, 82, 15, 102, 29, 31, 138, 46, 100],
        },
      ],
      chart: {
        height: 450,
        type: "area"
      },
      title: {
        text: "Graphic of the evolution of the reel title on the market"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      },
      stroke: {
        curve: "smooth"
      }
    };
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
