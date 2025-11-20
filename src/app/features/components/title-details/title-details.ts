import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import composant
import { DialogBox } from '../../../shared/components/dialog-box/dialog-box';

// Import PrimeNG Librairies
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { VirtualAsset } from '../../../shared/models/asset.model';
import { TitleService } from '../../../core/services/Titles/title-service';

@Component({
  selector: 'app-title-details',
  imports: [CommonModule, Dialog, ToastModule, ButtonModule, DialogBox],
  templateUrl: './title-details.html',
  styleUrl: './title-details.scss',
  providers: [MessageService]
})
export class TitleDetails implements OnInit {
  protected readonly dialogLabel = signal<string>('Détails du titre');

  current_title = signal<VirtualAsset | null>(null); // Récupération du nom du titre courant
  title_id = input<string>('');
  buttonLabel = input<string>('');
  visible: boolean = false;
  action = input<string>('');


  // Injection des service
  private titleService = inject(TitleService);
  private messageService = inject(MessageService);

  constructor() {

  }

  ngOnInit(): void {
    //this.fecthTitleDetails(this.title_id()); // Récupération des détails du titre
    
  }

  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
    this.fecthTitleDetails(this.title_id()); // Récupération des détails du titre
  }

  closeDialog() {
    this.visible = false;
  }

  // Fonction pour la Récupération des détails du titre
  fecthTitleDetails(title_code: string) {
    try {
      this.titleService.getReelTitleDetails(title_code).subscribe({
        next: (response) => {
          console.log(response);
          this.current_title.set(response);
        },
        error: (error) => {
          this.showMessage('error', 'Erreur', `${error.message}`);
        }
      })
    } catch (error: any) {
      this.showMessage('error', 'Erreur', `${error.message}`);
    }
  }

  onActivate() {
    try {
      this.titleService.activateRealTitle(this.current_title()?.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } catch (error) {
      this.showMessage('error', 'Erreur', 'Une erreur est survenue');
    }
  }

  onDeleteTitle() {
    try {
      this.titleService.deleteReelTitle(this.title_id()).subscribe({
        next: (response) => {
          console.log(response);
          this.showMessage('success', 'Succès', 'Titre supprimé avec succès');
          this.closeDialog();
        },
        error: (error) => {
          this.showMessage('error', 'Erreur', `${error.message}`);
          this.closeDialog();
        }
      });
    } catch (error: any) {
      this.showMessage('error', 'Erreur', `${error.message}`);
    }
  }


  // Fonction pour afficher les messages de retour d'API
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
