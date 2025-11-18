import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import Models
import { ReelAsset } from '../../models/asset.model';

// Import Services
import { TitleService } from '../../../core/services/Titles/title-service';

// Import PrimeNG Librairies
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-virtual-title-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Dialog, ToastModule, ButtonModule],
  templateUrl: './virtual-title-form.html',
  styleUrl: './virtual-title-form.scss',
  providers: [MessageService]
})
export class VirtualTitleForm implements OnInit {
  visible: boolean = false;
  realAssetList = signal<ReelAsset[]>([]);

  // Injection de service
  private titleService = inject(TitleService);
  private messageService = inject(MessageService);


  // Création du formulaire de titre virtuel
  virtualTitleForm: FormGroup = new FormGroup({
    real_title: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    buy_price: new FormControl('', [Validators.required, Validators.min(50)]),
    sell_price: new FormControl('', [Validators.required, Validators.min(50)]),
    is_available: new FormControl(true)
  });

  constructor() { }

  ngOnInit(): void {
    const realAssets = JSON.parse(localStorage.getItem('real_assets') || '');
    this.realAssetList.set(realAssets);
  }

  // fonction pour récupérer les contrôles du formulaire
  get f() {
    return this.virtualTitleForm.controls;
  }

  // Afficher le formulaire de création de titre virtuel
  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  // Afficher le formulaire de création de titre virtuel
  closeDialog() {
    this.visible = false;
    this.virtualTitleForm.reset();
  }

  // fonction pour soumettre le formulaire
  onSubmit() {
    // Vérifier si le formulaire est valide
    if (this.virtualTitleForm.valid) {
      console.log('Virtual title form:', this.virtualTitleForm.value);

      try {
        this.titleService.createVirtualTitle(this.virtualTitleForm.value).subscribe({
          next: (response) => {
            console.log('Titre virtuel créé avec succès:', response);
            this.showMessage('success', 'Succès', 'Titre virtuel créé avec succès');
            this.virtualTitleForm.reset();
            this.closeDialog();
          },
          error: (error) => {
            console.error('Erreur lors de la création du titre virtuel:', error);
            this.showMessage('error', 'Erreur', "Échec de la création du titre virtuel");
          }
        });
      } catch (error) {
        this.showMessage('error', 'Erreur', 'Un problème est survenu veuillez réessayer plus tard');
      }
    } else {
      this.virtualTitleForm.markAllAsTouched();
    }
  }

  // fonction pour afficher les messages de retour d'api
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
