import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import models service
import { VirtualAsset } from '../../../shared/models/asset.model';
import { Transaction } from '../../../shared/models/transaction.model';

// Import PrimeNG Libraries
import { ButtonModule } from 'primeng/button';

// Import components
import { ChartLine } from '../../../shared/components/chart-line/chart-line';
import { CryptoCard } from '../../../shared/components/crypto-card/crypto-card';
import { StatisticCard } from '../../../shared/components/statistic-card/statistic-card';
import { TransactionDetails } from '../../../shared/components/transaction-details/transaction-details';

// Import fake data
import assets from '../../../shared/database/assets.json';
import transactions from '../../../shared/database/transactions.json';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StatisticCard, ChartLine, CryptoCard, ButtonModule, TransactionDetails],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  marketData = signal<VirtualAsset[]>([]);
  lastData = signal<VirtualAsset[]>([]);
  transactionList = signal<Transaction[]>([]);
  selectedTransaction = signal<Transaction | null>(null);

  ngOnInit() {
    this.marketData.set(assets);
    this.transactionList.set([]);
  }

  showTransactionDetails(transaction: Transaction) {
    // Logique pour afficher les détails de la transaction
    this.selectedTransaction.set(transaction);
    console.log('Afficher les détails pour:', this.selectedTransaction());
  }
}
