import { Component, inject, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import PrimeNG Libraries
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dialog-box',
  imports: [Dialog, ButtonModule, InputTextModule, ToastModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.scss',
  providers: [MessageService],
})
export class DialogBox {
  isOpen = input(false);
  visible: boolean = false;
  action = input<string>('');
  buttonLabel = input<string>('');

  private messageService = inject(MessageService);

  // Form group pour les inputs
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

  constructor() {

  }

  get f() {
    return this.assetForm.controls;
  }

  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onSubmit() {
    // Vérifier si le formulaire est valide
    if (this.assetForm.valid) {
      console.log(this.assetForm.value);

      // Afficher une notification de succès
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Le titre a été ajouté avec succès',
        life: 3000,
        closable: true,
      });
      this.closeDialog();
      this.assetForm.reset();
    } else {
      // Si e formulaire n'est pas valide, afficher les message d'erreur sur le formulaire
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.assetForm.controls).forEach((key) => {
        const control = this.assetForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
