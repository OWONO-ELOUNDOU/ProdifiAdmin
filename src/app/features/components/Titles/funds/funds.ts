import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Libraires
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Import Components
import { FundsForm } from '../../../../shared/components/Funds/funds-form/funds-form';
import { FundsStatisticCard } from '../../../../shared/components/Funds/funds-statistic-card/funds-statistic-card';


import { Fund } from '../../../../shared/models/asset.model';


import { FundsService } from '../../../../core/services/Funds/funds-service';

@Component({
  selector: 'app-funds',
  imports: [CommonModule, FundsStatisticCard, ButtonModule, TableModule, FundsForm],
  templateUrl: './funds.html',
  styleUrl: './funds.scss'
})
export class Funds implements OnInit {
  fundsData = signal<Fund[]>([]);
  totalFunds = signal(0)

  // Injection de service
  private fundsService = inject(FundsService);

  constructor() { }

  ngOnInit(): void {
    this.totalFunds.set(this.fundsData().length);
  }

  fetchFundsData() {

  }
}
