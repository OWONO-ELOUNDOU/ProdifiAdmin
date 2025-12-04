import { Component, inject, Input, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

// Import PrimeNG Libraries
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';


// Import Models & services
import { Transaction } from '../../models/transaction.model';
import { Transaction as TransactionService } from '../../../core/services/Transaction/transaction';

@Component({
  selector: 'app-transaction-details',
  imports: [CommonModule, ButtonModule, Dialog, ToastModule],
  templateUrl: './transaction-details.html',
  styleUrl: './transaction-details.scss',
  providers: [MessageService]
})
export class TransactionDetails {
  protected readonly title = signal('Détails de la transaction');

  // Injection de service
  private messageService = inject(MessageService);
  private transactionService = inject(TransactionService);

  // Récupèrer la transaction à afficher
  @Input() item!: Transaction;
  visible: boolean = false;

  // Formulaire pour annulation, Mark_paid & settle
  TransactionForm: FormGroup = new FormGroup({
    payment_ref: new FormControl(''),
    source: new FormControl(''),
    reason: new FormControl(''),
    nav_at_exec: new FormControl(0)
  })

  get f() {
    return this.TransactionForm.controls;
  }

  showDetails(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  // Méthode pour approuver une transaction
  onApprove(id: string, ) {
    try {
      this.transactionService.approveTransaction(id, this.item).subscribe({
        next: (data) => {
          console.log(data);
          this.showMessage('success', 'Succès', 'La transaction approuvée');
        },
        error: (error) => {
          console.log("Erreur lors de l'approbation", error.error.message)
          this.showMessage('danger', 'Erreur', 'Erreur lors de l\'approbation');
        }
      })
    } catch (error: any) {
      console.log('Une erreur est survenue', error.error.message);
      this.showMessage('error', 'Erreur', 'Une erreur est survenue');
    }
  }

  onCancel(id: string) {
    this.TransactionForm.patchValue({
      payment_ref: this.item.payment_ref,
      reason: 'manual'
    });

    try {
      this.transactionService.cancelTransaction(id, this.TransactionForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.showMessage('success', 'Succès', 'La transaction a été annulée');
        },
        error: (error) => {
          console.log('Erreur lors de l\'annulation', error.error.message);
          this.showMessage('danger', 'Erreur', 'Erreur lors de l\'annulation');
        }
      })
    } catch (error: any) {
      console.log('Une erreur est survenue', error.error.message);
      this.showMessage('danger', 'Erreur', 'Une erreur est survenue');
    }
  }

  onMarkPaid(id: string) {
    this.TransactionForm.patchValue({
      payment_ref: this.item.payment_ref,
      reason: 'manual'
    });

    try {
      this.transactionService.markPaidTransaction(id, this.TransactionForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.showMessage('success', 'Succès', 'La transaction marquée');
        },
        error: (error) => {
          console.log('Erreur lors de l\'opération', error.error.message);
          this.showMessage('danger', 'Erreur', 'Erreur lors de l\'opération');
        }
      })
    } catch (error: any) {
      console.log('Une erreur est survenue', error.error.message);
      this.showMessage('danger', 'Erreur', 'Une erreur est survenue');
    }
  }

  onSettle(id: string) {
    this.TransactionForm.patchValue({
      payment_ref: this.item.payment_ref,
      reason: 'manual'
    });

    try {
      this.transactionService.settleTransaction(id, this.TransactionForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.showMessage('success', 'Succès', 'La transaction réglée');
        },
        error: (error) => {
          console.log('Erreur lors du règlement', error.error.message);
          this.showMessage('danger', 'Erreur', 'Erreur lors du règlement');
        }
      })
    } catch (error: any) {
      console.log('Une erreur est survenue', error.error.message);
      this.showMessage('danger', 'Erreur', 'Une erreur est survenue');
    }
  }

  displayToastMessages(status: string) {
    if (status === 'terminée' || status === 'annulée') {
      this.showMessage('warn', 'info', 'Une transaction terminée ou annulée ne peut pas être révoquée');
    } else {
      this.showMessage('success', 'Succès', 'La transaction a été révoquée avec succès');
      this.closeDialog()
    }
  }

  onSubmit() {

  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      life: 3000,
      closable: true
    })
  }
}
