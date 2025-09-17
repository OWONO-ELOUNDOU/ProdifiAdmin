import { Component, OnInit, signal } from '@angular/core';
import { Card } from '../card/card';

// Import card model
import { Card_Interface } from '../../models/card.model';

@Component({
  selector: 'app-statistic-card',
  imports: [Card],
  templateUrl: './statistic-card.html',
  styleUrl: './statistic-card.scss'
})
export class StatisticCard implements OnInit {
  cards = signal<Card_Interface[]>([]);

  ngOnInit(): void {
    this.cards.set([
      {
        title: 'Revenus',
        amount: 892.2,
        evolution_rate: 0.2,
        last_data: 889.1,
        background: 'black'
      },
      {
        title: 'Nouveau Clients',
        amount: 12800,
        evolution_rate: 3.1,
        last_data: 12400,
        background: 'pink'
      },
      {
        title: 'Total transactions',
        amount: 320,
        evolution_rate: -1.2,
        last_data: 340,
        background: 'blue'
      },
      {
        title: 'Titres d\'état',
        amount: 23,
        evolution_rate: -0.1,
        last_data: 24,
        background: 'turquoise'
      }
    ])
  }
}
