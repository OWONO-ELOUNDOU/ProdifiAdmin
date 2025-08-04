import { Component, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-crypto-card',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './crypto-card.html',
  styleUrl: './crypto-card.scss'
})
export class CryptoCard {
  cryptoItem = input<any>();
}
