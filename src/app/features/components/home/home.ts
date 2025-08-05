import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';

// Import crypto service
import { Crypto } from '../../../core/services/Crypto/crypto';

// Import components
import { ChartLine } from '../../../shared/components/chart-line/chart-line';
import { CryptoCard } from '../../../shared/components/crypto-card/crypto-card';
import { StatisticCard } from '../../../shared/components/statistic-card/statistic-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StatisticCard, UpperCasePipe, ChartLine, CryptoCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private cryptoService = inject(Crypto);

  marketData = signal<any[]>([]);
  lastData = signal<any[]>([]);

  ngOnInit() {
    this.cryptoService.getMarketData().subscribe(data => {
      localStorage.setItem('crypto_data', JSON.stringify(data));
    }, error => {
      console.error('Error fetching market data:', error);
    });

    this.marketData.set(JSON.parse(localStorage.getItem('crypto_data') || '[]'));
    this.lastData.set(this.marketData().slice(0, 5));
  }
}
