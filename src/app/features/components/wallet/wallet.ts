import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import other components, modules, services, etc. as needed
// import PrimeNG modules if required
import { MessageService } from 'primeng/api';

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

  activeTab = 'withdrawals'; // Définit l'onglet actif par défaut

  constructor() { }

  ngOnInit(): void {
    // Initialization logic here
  }

  fetchWalletBalance() {

  }

  setActiveTab(tab: string) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }
}
