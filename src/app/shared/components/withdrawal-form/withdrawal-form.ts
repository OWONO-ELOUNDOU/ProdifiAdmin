import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import PrimeNG librairies
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

// Import custom services
import { WalletService } from '../../../core/services/Wallet/wallet-service';

@Component({
  selector: 'app-withdrawal-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Dialog, ButtonModule, ToastModule],
  templateUrl: './withdrawal-form.html',
  styleUrl: './withdrawal-form.scss',
  providers: [MessageService]
})
export class WithdrawalForm {
  visible: boolean = false;

  // Injection de service
  private messageService = inject(MessageService);
  private walletService = inject(WalletService);

  // Formulaire de demande de retrait
  withdrawalForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(1000)]),
    channel: new FormControl('', Validators.required),
    note: new FormControl('')
  });

  constructor() {}

  // fonction getter pour récupérer les propriétés du formulaire et leur valeur
  get f() {
    return this.withdrawalForm.controls;
  }

  // fonction pour afficher le formulaire
  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  // fonction pour fermer le formulaire
  closeDialog() {
    this.visible = false;
  }

  // fonction pour envoi du formulaire
  onSubmit() {
    // Vérification de la validité du formulaire
    if (this.withdrawalForm.valid) {
      console.table('Withdrawal form data:', this.withdrawalForm.value);
      // Logic to handle withdrawal request goes here

      try {
        this.walletService.initiateWithdrawal(this.withdrawalForm.value).subscribe({
          next: (response) => {
            console.log('Withdrawal initiated successfully:', response);
            this.showMessage('success', 'Success', 'Withdrawal request submitted successfully.');
            this.closeDialog();
            this.withdrawalForm.reset(); // Reset the form after successful submission
          },
          error: (error) => {
            console.error('Error initiating withdrawal:', error.error.message);
            this.showMessage('danger','Error',error.error.message || 'Failed to initiate withdrawal.');
          },
        });
      } catch (error: any) {
        console.log('Something went wrong:', error.error.message);
      }

    } else {
      this.withdrawalForm.markAllAsTouched();
      this.showMessage('danger', 'Error','Please fill in all required fields correctly.');
    }
  }

  // fonction pour afficher un message de retour d'api
  showMessage(type: string, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      life: 3000,
      closable: true
    });
  }
}
