import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Librairies
import { TableModule } from 'primeng/table';

// Import service
import { WalletService } from '../../../core/services/Wallet/wallet-service';

@Component({
  selector: 'app-wallet-withdrawals-table',
  imports: [CommonModule],
  templateUrl: './wallet-withdrawals-table.html',
  styleUrl: './wallet-withdrawals-table.scss'
})
export class WalletWithdrawalsTable implements OnInit {
  // Injection de service
  private walletService = inject(WalletService);

  // Déclaration des variables
  withdrawals = signal<any[]>([]);

  constructor() {}

  ngOnInit(): void {
    
  }

  fecthWithdrawals() {
    try {
      
    } catch (error) {
      
    }
  }
}
