import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import PrimeNG Librairies
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-asset-form',
  imports: [CommonModule, ToastModule, FormsModule, ReactiveFormsModule],
  templateUrl: './asset-form.html',
  styleUrl: './asset-form.scss',
  providers: [ConfirmationService, MessageService]
})
export class AssetForm {
  private messageService = inject(MessageService);

  // Récupèrer le titre à modifier
  currentItem = input<any>({});

  // Formulaire de modification du titre
  assetForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.min(150)]),
    buy_price: new FormControl(0, [Validators.required, Validators.min(50)]),
    sell_price: new FormControl(0, [Validators.required, Validators.min(60)]),
    interest_rate: new FormControl(0, [Validators.required, Validators.min(5)]),
    maturity_date: new FormControl('', Validators.required),
    marge: new FormControl(0, [Validators.required, Validators.min(3)]),
    created_at: new FormControl(new Date().toISOString()),
  });

  constructor() {}

  get f() {
    return this.assetForm.controls;
  }

  onSubmit() {
    // Vérifie si le formulaire est validée
    if (this.assetForm.invalid) {
      console.log(this.assetForm.value);

      // Affiche une notification de succès
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Le titre a été modifié avec succès.',
        life: 3000,
        closable: true
      });
      return;
    } else {
      // Si le formulaire n'est pas valide
      // Marquer tous les champs comme "touched" pour afficher les erreurs
      Object.keys(this.assetForm.controls).forEach((key) => {
        const control = this.assetForm.get(key);
        control?.markAsTouched();
      })
    }
  }
}
