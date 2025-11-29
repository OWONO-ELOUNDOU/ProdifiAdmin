import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet-balance-card',
  imports: [CommonModule],
  templateUrl: './wallet-balance-card.html',
  styleUrl: './wallet-balance-card.scss'
})
export class WalletBalanceCard {
  cardItemTitle = input('');
  cardItemNumber = input(0);
  cardItemDescription = input('');
  backgroundColor = input('');
}
