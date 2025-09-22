import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Librairies
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

// Import Components
import { TitleDetails } from '../title-details/title-details';
import { AssetForm } from '../../../shared/components/asset-form/asset-form';
import { DialogBox } from '../../../shared/components/dialog-box/dialog-box';
import { ChartLine } from '../../../shared/components/chart-line/chart-line';
import { CryptoCard } from '../../../shared/components/crypto-card/crypto-card';

// Import crypto service
import { TitleService } from '../../../core/services/Titles/title-service';

// Import assets data
import assets from '../../../shared/database/assets.json';
import { VirtualAsset } from '../../../shared/models/asset.model';

@Component({
  selector: 'app-assets',
  imports: [
    CommonModule,
    CryptoCard,
    ChartLine,
    ButtonModule,
    ToastModule,
    DialogBox,
    AssetForm,
    TableModule,
    TitleDetails
  ],
  templateUrl: './assets.html',
  styleUrl: './assets.scss',
  providers: [ConfirmationService, MessageService],
})
export class Assets implements OnInit {
  protected readonly title = signal('Titres');
  isOpened = signal(false);

  // Inject le service des titres
  private titleService = inject(TitleService);

  protected priceData = signal<number[]>([]);
  protected titleData = signal<VirtualAsset[]>([]);
  protected assetsData = signal<VirtualAsset[]>([]);
  lastItem = signal(0);

  // Inject primeNG message and confirmation service
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  constructor() {}

  ngOnInit(): void {
    // Récupérer les données des transactions
    this.onFecthData();

    this.assetsData.set(JSON.parse(localStorage.getItem('title_data') || ''));
    this.lastItem.set(this.assetsData().length - 1);
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward ?',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
        label: 'Annuler',
        icon: 'pi pi-times',
        variant: 'outlined',
        severity: 'secondary',
        size: 'small',
      },
      acceptButtonProps: {
        label: 'Confirmer',
        icon: 'pi pi-check',
        variant: 'contained',
        severity: 'danger',
        size: 'small',
      },
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmé',
          detail: 'Titre supprimé',
        });
        // Logique de suppression du titre
        const currentData = this.titleData();
        if (currentData.length > 0) {
          currentData.pop(); // Suppression du dernier élément pour l'exemple
          this.titleData.set(currentData);
          localStorage.setItem('crypto_data', JSON.stringify(currentData));
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Annulé',
          detail: 'Action annulée',
        });
      },
    });
  }

  displayForm() {
    this.isOpened.set(!this.isOpened());
    console.log('isOpened:', this.isOpened());
  }

  // Fonction pour récupérer les titres depuis le backend
  onFecthData() {
    try {
      this.titleService.getAllTitles().subscribe({
        next: (data) => {
          this.titleData.set(data.results);
          console.log(this.titleData());
        },
        error: (error) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Info',
            detail: 'Aucun titre disponible',
            life: 3000,
            closable: true
          })
        }
      })
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors du chargement des données',
        life: 3000,
        closable: true
      })
    }
  }


  // Fonction pour supprimer un titre depuis le backend
  onDeleteData(title_code: string) {
    try {
      this.titleService.deleteTitle(title_code).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Le titre a été supprimé',
            life: 3000,
            closable: true
          })
        },
        error: (error) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Info',
            detail: 'Titre non existant',
            life: 3000,
            closable: true
          })
        }
      })
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors de la suppression des données',
        life: 3000,
        closable: true
      })
    }
  }
}
