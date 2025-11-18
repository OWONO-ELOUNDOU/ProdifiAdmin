import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Models
import { VirtualAsset } from '../../models/asset.model';

@Component({
  selector: 'app-virtual-title-card',
  imports: [CommonModule],
  templateUrl: './virtual-title-card.html',
  styleUrl: './virtual-title-card.scss'
})
export class VirtualTitleCard {
  virtualTitleItem = input<VirtualAsset>();

  constructor() {}
}
