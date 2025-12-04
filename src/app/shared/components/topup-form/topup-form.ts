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
  selector: 'app-topup-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Dialog, ButtonModule, ToastModule],
  templateUrl: './topup-form.html',
  styleUrl: './topup-form.scss'
})
export class TopupForm {
  visible: boolean = false;

  // Injection de service
  private messageService = inject(MessageService);
  private walletService = inject(WalletService);

  // Formulaire de demande de recharge
  topupForm: FormGroup = new FormGroup({
    mobile_wallet_number: new FormControl('', Validators.required),
    amount: new FormControl(0, [Validators.required, Validators.min(1000)]),
    description: new FormControl(''),
    payer_note: new FormControl('')
  });

  constructor() {}

  // fonction getter pour récupérer les propriétés du formulaire et leur valeur
  get f() {
    return this.topupForm.controls;
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
    if (this.topupForm.valid) {
      console.table('Topup form data:', this.topupForm.value);
      // Logic to handle top-up request goes here
      try {
        this.walletService.initiateTopup(this.topupForm.value).subscribe({
          next: (data) => {
            console.log('Topup Request Response:', data);
            this.showMessage('success', 'Succès', 'Votre demande de recharge a été soumise avec succès.');
            this.topupForm.reset();
            this.closeDialog();
          },
          error: (error) => {
            console.log('Error initiating top-up:', error.error.message);
            this.showMessage('danger', 'Erreur', "Échec de la soumission de votre demande de recharge.");
          }
        })
      } catch (error: any) {
        console.log('Error initiating top-up:', error.error.message);
            this.showMessage('danger', 'Erreur', error.error.message);
      }
    } else {
      this.topupForm.markAllAsTouched();
      this.showMessage('error', 'Erreur', 'Veuillez remplir correctement le formulaire de recharge.');
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
