import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// import other components, modules, services, etc. as needed
// import PrimeNG modules if required
import { MessageService } from 'primeng/api';

// Import WalletService
import { WalletService } from '../../../core/services/Wallet/wallet-service';

// Import custom components
import { WalletBalanceCard } from '../../../shared/components/wallet-balance-card/wallet-balance-card';
import { WalletTopupsTable } from '../../../shared/components/wallet-topups-table/wallet-topups-table';
import { WalletWithdrawalsTable } from '../../../shared/components/wallet-withdrawals-table/wallet-withdrawals-table';

@Component({
  selector: 'app-wallet',
  imports: [CommonModule, WalletBalanceCard, WalletTopupsTable, WalletWithdrawalsTable],
  templateUrl: './wallet.html',
  styleUrl: './wallet.scss',
  standalone: true,
  providers: [MessageService]
})
export class Wallet implements OnInit {
  // Injection de services
  // private walletService = inject(WalletService);
  private messageService = inject(MessageService);
  private walletService = inject(WalletService);

  activeTab = 'withdrawals'; // Définit l'onglet actif par défaut
  walletBalance = signal('');

  constructor() { }

  ngOnInit(): void {
    // Initialization logic here
    this.fetchWalletBalance();
  }

  fetchWalletBalance() {
    try {
      this.walletService.getWalletDetails().subscribe({
        next: (data) => {
          console.log('Wallet Details:', data);
          this.walletBalance.set(data.balance);
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to fetch wallet details.'});
        }
      })
    } catch (error) {
      this.messageService.add({severity:'danger', summary: 'Error', detail: 'Une erreur est survenue.'});
    }
  }

  setActiveTab(tab: string) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }
}
