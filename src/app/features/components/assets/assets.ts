import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Librairies
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

// Import Components
import { ChartLine } from '../../../shared/components/chart-line/chart-line';
import { CryptoCard } from '../../../shared/components/crypto-card/crypto-card';

@Component({
  selector: 'app-assets',
  imports: [CommonModule, CryptoCard, ChartLine, ButtonModule, ToastModule],
  templateUrl: './assets.html',
  styleUrl: './assets.scss',
  providers: [ConfirmationService, MessageService]
})
export class Assets implements OnInit {
  protected readonly title = signal('Titres');
  protected transactionData = signal<any[]>([]);
  protected priceData = signal<number[]>([]);

  // Inject primeNG message and confirmation service
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  constructor() {

  }

  ngOnInit(): void {
    // Récupérer les données des transactions
    this.transactionData.set(JSON.parse(localStorage.getItem('crypto_data') || '[]'));
    console.log('transactions data: ', this.transactionData());
  }

  confirm() {}
}
