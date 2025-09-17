import { Component, inject, Input, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Libraries
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';


// Import Models
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-details',
  imports: [CommonModule, ButtonModule, Dialog, ToastModule],
  templateUrl: './transaction-details.html',
  styleUrl: './transaction-details.scss',
  providers: [MessageService]
})
export class TransactionDetails {
  protected readonly title = signal('Détails de la transaction');

  // Inject PrimeNG MessageService
  private messageService = inject(MessageService);

  // Récupèrer la transaction à afficher
  @Input() item!: Transaction;
  visible: boolean = false;

  showDetails(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  displayToastMessages(status: string) {
    if (status === 'terminée' || status === 'annulée') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Info',
        detail: 'Une transaction terminée ou annulée ne peut pas être révoquée',
        life: 3000
      })
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'La transaction a été révoquée avec succès',
        life: 3000
      });
      this.closeDialog()
    }
  }

  onSubmit() {

  }
}
