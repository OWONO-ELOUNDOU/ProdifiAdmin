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

    // Get the total supply, current price and circulating supply informations
    const interest_Arr = this.chartData().slice(0, 9).map(item => Math.round(item.interest_rate));
    const price_Arr = this.chartData().slice(0, 9).map(item => Math.round(item.amount));
    const quantity_Arr = this.chartData().slice(0, 9).map(item => Math.round(item.quantity));

    const orderedBySupply = quantity_Arr.map(item => Math.round(item)).sort((a, b) => a - b);
    console.log('Ordered by Supply:', orderedBySupply);

    this.chartOptions = {
      series: [
        {
          name: 'Quantité',
          data: quantity_Arr
        },
        {
          name: 'profitabilité',
          data: interest_Arr
        },
        {
          name: 'Prix actuel',
          data: price_Arr
        }
      ],
      chart: {
        type: 'area',
        height: 350,
        zoom: { enabled: false },
        toolbar: { show: false }
      },
      title: {
        text: "Vue d'ensemble du marché des titres",
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: '400',
          fontFamily: 'Outfit',
          color: '#777777'
        }
      },
      xaxis: {
        categories: this.chartData().map(coin => coin.name),
        type: 'category',
        labels: {
          style: {
            colors: '#333333',
            fontWeight: '500',
            fontSize: '12px',
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      }
    }
  }

  fetchData() {
    try {
      this.titleService.getAllTitles().subscribe({
        next: (data) => {
          this.chartData.set(data.results);
          console.log('Fetched chart data:', this.chartData());
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      })
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  }
}
