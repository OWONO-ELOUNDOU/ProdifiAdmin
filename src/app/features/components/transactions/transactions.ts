import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-transactions',
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {
  protected transactions = signal([] as any[]);
}
