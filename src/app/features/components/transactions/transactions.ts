import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Primeng modules
import { TableModule } from 'primeng/table';

// Import Components
import { TransactionDetails } from '../../../shared/components/transaction-details/transaction-details';

// Import models
import { Transaction } from '../../../shared/models/transaction.model';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, TransactionDetails, TableModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  protected transactions = signal([] as Transaction[]);
  
  ngOnInit(): void {
    
  }

  

}
