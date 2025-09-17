import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualAsset } from '../../models/asset.model';

@Component({
  selector: 'app-crypto-card',
  imports: [CommonModule],
  templateUrl: './crypto-card.html',
  styleUrl: './crypto-card.scss'
})
export class CryptoCard {
  cryptoItem = input<VirtualAsset>();
}
