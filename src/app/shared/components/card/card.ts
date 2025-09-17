import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Primeng modules if needed
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Card_Interface } from '../../models/card.model';
import { VirtualAsset } from '../../models/asset.model';

@Component({
  selector: 'app-card',
  imports: [CommonModule, ButtonModule, Menu],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements OnInit {
  items!: MenuItem[];
  cardItem = input<Card_Interface>();
  assetItem = input<VirtualAsset>();

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          { label: 'View Details', icon: 'pi pi-fw pi-eye', size: 'small' },
          { label: 'Download Report', icon: 'pi pi-fw pi-download' }
        ]
      }
    ];

    console.log(this.cardItem());
  }
}
