import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Librairies
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-asset-form',
  imports: [CommonModule, ToastModule],
  templateUrl: './asset-form.html',
  styleUrl: './asset-form.scss',
  providers: [ConfirmationService, MessageService]
})
export class AssetForm {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  // Récupèrer le titre à modifier
  currentItem = input<any>({});

  onSubmit(event: any) {
    event.preventDefault();
    // Logique pour enregistrer le titre modifié
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Le titre a été modifié avec succès',
      life: 3000
    });
  }
}
