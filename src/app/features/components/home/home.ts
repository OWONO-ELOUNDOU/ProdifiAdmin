import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import models service
import { ReelAsset, VirtualAsset } from '../../../shared/models/asset.model';
import { Transaction } from '../../../shared/models/transaction.model';

// Import PrimeNG Libraries
import { ButtonModule } from 'primeng/button';

// Import components
import { TitleDetails } from '../title-details/title-details';
import { StatisticCard } from '../../../shared/components/statistic-card/statistic-card';
import { TransactionDetails } from '../../../shared/components/transaction-details/transaction-details';
import { FundsStatisticCard } from '../../../shared/components/Funds/funds-statistic-card/funds-statistic-card';

// Import services
import { TitleService } from '../../../core/services/Titles/title-service';
import { Transaction as TransactionService } from '../../../core/services/Transaction/transaction';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ButtonModule, TransactionDetails, TitleDetails, FundsStatisticCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  // Injection de services
  private titleService = inject(TitleService);
  private transactionService = inject(TransactionService);

  // Définition des signaux
  lastTitleData = signal<ReelAsset[]>([]);
  btaTitleList = signal<ReelAsset[]>([]);
  otaTitleList = signal<ReelAsset[]>([]);
  transactionList = signal<Transaction[]>([]);
  selectedTransaction = signal<Transaction | null>(null);

  ngOnInit() {
    this.fecthTitleData(); // Récupération des données des titres
    this.fetchTransactionData(); // Récupération des données des transactions
  }

  fecthTitleData() {
    try {
      this.titleService.getAllRealTitles().subscribe({
        next: (data) => {
          this.lastTitleData.set(data.results);
          console.log('Données des titres récupérées:', this.lastTitleData());
          this.lastTitleData().forEach(title => {
            if(title.title_type === 'BTA') {
              this.btaTitleList().push(title);
            } else if(title.title_type === 'OTA') {
              this.otaTitleList().push(title);
            }
          });
          console.log('Titres BTA:', this.btaTitleList());
          console.log('Titres OTA:', this.otaTitleList());
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données des titres:', error.error.message);
        },
      });
    } catch (error: any) {
      console.log(error.error.message)
    }
  }

  fetchTransactionData() {
    try {
      this.transactionService.getAllTransactions().subscribe({
        next: (data) => {
          this.transactionList.set(data.results);
          console.log('Données des transactions récupérées:', this.transactionList());
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données des transactions:', error.error.message);
        },
      });
    } catch (error: any) {
      console.log(error.error.message);
    }
  }

  showTransactionDetails(transaction: Transaction) {
    // Logique pour afficher les détails de la transaction
    this.selectedTransaction.set(transaction);
    console.log('Afficher les détails pour:', this.selectedTransaction());
  }
}
