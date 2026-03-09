import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Libraries
import { TableModule } from 'primeng/table';

// Import Services
import { WalletService } from '../../../core/services/Wallet/wallet-service';
import { Topups } from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-topups-table',
  imports: [CommonModule, TableModule],
  templateUrl: './wallet-topups-table.html',
  styleUrl: './wallet-topups-table.scss'
})
export class WalletTopupsTable implements OnInit {
  // Injection du service Wallet
  private walletService = inject(WalletService);

  protected topupsData = signal<Topups[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fecthTopupsData();
  }

  // Fonction pour récupérer les informations de recharges
  fecthTopupsData() {
    try {
      this.walletService.getTopupsHistory().subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log('Erreur lors du chargement des informations de recharges', error.error.message);
        }
      })
    } catch (error: any) {
      console.log('Une erreur est survenue', error.error.message);
    }
  }
}
