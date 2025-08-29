import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG Librairies
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

// Import Components
import { AssetForm } from '../../../shared/components/asset-form/asset-form';
import { DialogBox } from '../../../shared/components/dialog-box/dialog-box';
import { ChartLine } from '../../../shared/components/chart-line/chart-line';
import { CryptoCard } from '../../../shared/components/crypto-card/crypto-card';

// Import crypto service
import { Crypto } from '../../../core/services/Crypto/crypto';

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
    Menu,
    DialogBox,
    AssetForm,
    TableModule
  ],
  templateUrl: './assets.html',
  styleUrl: './assets.scss',
  providers: [ConfirmationService, MessageService],
})
export class Assets implements OnInit {
  protected readonly title = signal('Titres');
  isOpened = signal(false);

  // Inject crypto service
  private cryptoService = inject(Crypto);

  protected transactionData = signal<any[]>([]);
  protected assetsData = signal<VirtualAsset[]>([]);
  protected priceData = signal<number[]>([]);

  // Inject primeNG message and confirmation service
  items = signal<MenuItem[] | undefined>([]);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  constructor() {}

  ngOnInit(): void {
    // Récupérer les données des transactions
    this.cryptoService.getMarketData().subscribe(
      (data) => {
        this.transactionData.set(data);
      },
      (error) => {
        console.error('Error fetching market data:', error);
      }
    );

    this.assetsData.set(assets);
    console.log('Assets data:', this.assetsData());

    this.items.set([
      {
        label: 'Modifier',
        icon: 'pi pi-pencil',
        severity: 'info',
        size: 'small',
        command: () => {
          /*
          this.messageService.add({
            severity: 'info',
            summary: 'Modifier',
            detail: 'Modifier le titre',
          });
          */
          this.displayForm();
        },
      },
      {
        label: 'Supprimer',
        icon: 'pi pi-trash',
        severity: 'danger',
        size: 'small',
        command: () => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Supprimer',
            detail: 'Le titre a été supprimé. Cette action est irréversible.',
            life: 3000,
          });
          // Logique de suppression du titre
          /*
          const currentData = this.transactionData();
          if (currentData.length > 0) {
            currentData.pop(); // Suppression du dernier élément pour l'exemple
            this.transactionData.set(currentData);
            localStorage.setItem('crypto_data', JSON.stringify(currentData));
          }
          */
        },
      },
    ]);
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
        const currentData = this.transactionData();
        if (currentData.length > 0) {
          currentData.pop(); // Suppression du dernier élément pour l'exemple
          this.transactionData.set(currentData);
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
}
