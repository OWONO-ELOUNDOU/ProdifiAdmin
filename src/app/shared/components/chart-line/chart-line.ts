import { Component, computed, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Charts Module for charts
import { ChartComponent, ApexChart, ApexStroke, ApexXAxis, ApexAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { VirtualAsset } from '../../models/asset.model';

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

  chartData = input<VirtualAsset[]>([]);
  transactionsArr = [10, 80, 276, 348, 169, 400, 116, 369, 517, 82, 46, 479];
  marketCapArr = [50, 70, 95, 40, 65, 150, 230, 81, 400, 221, 110, 150];
  volumeArr = [300, 150, 25, 210, 65, 530, 120, 490, 500, 30, 185, 79];

  constructor(){

  }

  ngOnInit(): void {
    // Get the total supply, current price and circulating supply informations
    const marginArr = this.chartData().slice(0, 9).map(item => Math.round(item.interest_rate));
    const buyPriceArr = this.chartData().slice(0, 9).map(item => Math.round(item.amount));
    const quantityArr = this.chartData().slice(0, 9).map(item => Math.round(item.quantity));

    const orderedBySupply = quantityArr.map(item => Math.round(item)).sort((a, b) => a - b);
    console.log('Ordered by Supply:', orderedBySupply);

    this.chartOptions = {
      series: [
        {
          name: this.chartData() ? 'Quantité' : 'Market Cap',
          data: quantityArr.length === 0 ? quantityArr : this.marketCapArr
        },
        {
          name: this.chartData() ? 'Marge' : 'Volume',
          data: marginArr.length === 0 ? marginArr : this.volumeArr
        },
        {
          name: this.chartData() ? 'Prix actuel' : 'Transactions',
          data: buyPriceArr.length === 0 ? buyPriceArr : this.transactionsArr
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
}
