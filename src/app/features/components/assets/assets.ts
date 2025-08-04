import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Components
import { ChartLine } from '../../../shared/components/chart-line/chart-line';
import { CryptoCard } from '../../../shared/components/crypto-card/crypto-card';

@Component({
  selector: 'app-assets',
  imports: [CommonModule, CryptoCard, ChartLine],
  templateUrl: './assets.html',
  styleUrl: './assets.scss'
})
export class Assets implements OnInit {
  protected readonly title = signal('Titres');
  protected transactionData = signal<any[]>([]);
  protected priceData = signal<number[]>([]);

  constructor() {

  }

  ngOnInit(): void {
    // Récupérer les données des transactions
    this.transactionData.set(JSON.parse(localStorage.getItem('crypto_data') || '[]'));
    console.log('transactions data: ', this.transactionData());
  }
}
