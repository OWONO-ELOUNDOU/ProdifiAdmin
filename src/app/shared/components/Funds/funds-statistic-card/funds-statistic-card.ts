import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG libraires
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-funds-statistic-card',
  imports: [CommonModule, ButtonModule],
  templateUrl: './funds-statistic-card.html',
  styleUrl: './funds-statistic-card.scss'
})
export class FundsStatisticCard {
  cardItemTitle = input<string>('');
  cardItemNumber = input<number>(0);
  backgroundColor = input<string>('');
  cardItemDescription = input<string>('');
}
