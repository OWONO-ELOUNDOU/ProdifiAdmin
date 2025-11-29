import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Primeng modules
import { TableModule } from 'primeng/table';

// Import Components
import { TransactionDetails } from '../../../shared/components/transaction-details/transaction-details';

// Import models
import { Transaction } from '../../../shared/models/transaction.model';

// import services
import { Transaction as TransactionService } from '../../../core/services/Transaction/transaction';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, TransactionDetails, TableModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  // Injection de service
  private transactionService = inject(TransactionService);

  protected transactions = signal([] as Transaction[]);
  
  ngOnInit(): void {
    this.fecthTransaction();
  }

  fecthTransaction() {
    try {
      this.transactionService.getAllTransactions().subscribe({
        next: (response) => {
          console.log(response.results);
          this.transactions.set(response.results);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      })
    } catch (error: any) {
      console.log(error.error.message);
    }
  }

}
