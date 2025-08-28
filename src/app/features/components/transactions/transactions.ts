import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Components
import { TransactionDetails } from '../../../shared/components/transaction-details/transaction-details';

// Import models
import { Transaction } from '../../../shared/models/transaction.model';

// Import transaction fake data
import transactions from '../../../shared/database/transactions.json';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, TransactionDetails],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  protected transactions = signal([] as Transaction[]);
  
  ngOnInit(): void {
    this.transactions.set(transactions);
  }

}
