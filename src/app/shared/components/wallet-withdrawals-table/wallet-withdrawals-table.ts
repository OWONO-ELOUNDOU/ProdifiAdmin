import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Librairies
import { TableModule } from 'primeng/table';

// Import service
import { WalletService } from '../../../core/services/Wallet/wallet-service';
import { Withdrawals } from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-withdrawals-table',
  imports: [CommonModule, TableModule],
  templateUrl: './wallet-withdrawals-table.html',
  styleUrl: './wallet-withdrawals-table.scss'
})
export class WalletWithdrawalsTable implements OnInit {
  // Injection de service
  private walletService = inject(WalletService);

  // Déclaration des variables
  withdrawalsData = signal<Withdrawals[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.fecthWithdrawals();
  }

  fecthWithdrawals() {
    try {
      this.walletService.getWithdrawalHistory().subscribe({
        next: (data) => {
          console.log(data.results);
          this.withdrawalsData.set(data.results);
        },
        error: (error) => {
          console.error('Error fetching withdrawals:', error.error.message);
        }
      })
    } catch (error: any) {
      console.error('Unexpected error:', error.error.message);
    }
  }
}
