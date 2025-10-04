import { Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../card/card';

// Import card model
import { Card_Interface } from '../../models/card.model';
import { TitleService } from '../../../core/services/Titles/title-service';

@Component({
  selector: 'app-statistic-card',
  imports: [Card],
  templateUrl: './statistic-card.html',
  styleUrl: './statistic-card.scss'
})
export class StatisticCard implements OnInit {
  cards = signal<Card_Interface[]>([]);

  private titleService = inject(TitleService);
  constructor() { }

  ngOnInit(): void {
    this.cards.set([
      {
        title: 'Revenus',
        amount: 0,
        evolution_rate: 0,
        last_data: 0,
        background: 'black'
      },
      {
        title: 'Nouveau Clients',
        amount: 0,
        evolution_rate: 0,
        last_data: 0,
        background: 'pink'
      },
      {
        title: 'Total transactions',
        amount: 0,
        evolution_rate: 0.0,
        last_data: 0,
        background: 'blue'
      },
      {
        title: 'Titres d\'état',
        amount: this.fetchData(),
        evolution_rate: 0.0,
        last_data: 0,
        background: 'turquoise'
      }
    ])
  }

  fetchData(): number {
    let titleNumber = 0;
    try {
      this.titleService.getAllTitles().subscribe((data) => {
        titleNumber = data.results.length;
        console.log('Number of titles:', titleNumber); 
      });
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
    return titleNumber;
  }
}
