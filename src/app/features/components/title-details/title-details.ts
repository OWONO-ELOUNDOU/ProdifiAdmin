import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Librairies
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { VirtualAsset } from '../../../shared/models/asset.model';
import { TitleService } from '../../../core/services/Titles/title-service';

@Component({
  selector: 'app-title-details',
  imports: [CommonModule, Dialog, ToastModule, ButtonModule],
  templateUrl: './title-details.html',
  styleUrl: './title-details.scss',
  providers: [MessageService]
})
export class TitleDetails {
  protected readonly dialogLabel = signal<string>('Détails du titre');

  currentItem = input<VirtualAsset>(); // Récupération du titre courant
  buttonLabel = input<string>('');
  visible: boolean = false;
  action = input<string>('');


  // Injection des service
  private titleService = inject(TitleService);
  private messageService = inject(MessageService);

  constructor() {

  }

  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  onDeleteTitle(title_code: string) {
    
  }
}
