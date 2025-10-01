import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import PrimeNG Libraries
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// Import service titres
import { TitleService } from '../../../core/services/Titles/title-service';
import { VirtualAsset } from '../../models/asset.model';
import { UserLoginResponse } from '../../../core/models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box',
  imports: [Dialog, ButtonModule, InputTextModule, ToastModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.scss',
  providers: [MessageService],
})
export class DialogBox implements OnInit {
  isOpen = input(false);
  visible: boolean = false;
  action = input<string>('');
  buttonLabel = input<string>('');
  current_user!: UserLoginResponse;
  title_id = input<string>('');

  titleData = signal<VirtualAsset[]>([]); // Tableau pour stocker les titres depuis le backend

  private messageService = inject(MessageService);
  private titleService = inject(TitleService);
  private router = inject(Router);

  // Form group pour les inputs
  assetForm: FormGroup = new FormGroup({
    title_code: new FormControl(''),
    is_primary: new FormControl(false),
    name: new FormControl('', Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.min(60)]),
    amount: new FormControl(0, [Validators.required, Validators.min(50)]),
    state: new FormControl('', Validators.required),
    title_type: new FormControl('', Validators.required),
    interest_rate: new FormControl(0, [Validators.required, Validators.min(5)]),
    maturity_date: new FormControl('', Validators.required),
    bta_duration_weeks: new FormControl(0, [Validators.required, Validators.min(3)]),
    issue_date: new FormControl(''),
  });

  constructor() {

  }

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    this.current_user = JSON.parse(localStorage.getItem('current_firm') || '{}');

    //this.onFetchData();
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
    if (this.assetForm.valid) {
      const safeDate = new Date(this.assetForm.value.maturity_date).toLocaleDateString('en-CA'); // Formater la date au format ISO sans l'heure

      this.assetForm.patchValue({
        maturity_date: safeDate,
        is_primary: true
      });

      try {
        this.titleService.updateTitle(this.assetForm.value, this.title_id()).subscribe({
          next: (response) => {
            this.showMessage('success', 'Succès', 'Le titre a été modifié avec succès');
            this.assetForm.reset();
            this.router.navigate(['/assets']);
          },
          error: (error) => {
            this.showMessage('error', 'Erreur', `${error.error.message}`);
            this.assetForm.reset();
          }
        });

        this.closeDialog();
      } catch (error: any) {
        this.showMessage('error', 'Erreur', `${error.error.message}`);
        this.assetForm.reset();
      }
    }
  }


  // fonction pour enregistrer les titres
  onCreate() {
    if (this.assetForm.valid) {
      const safeDate = new Date(this.assetForm.value.maturity_date).toLocaleDateString('en-CA'); // Formater la date au format ISO sans l'heure

      this.assetForm.patchValue({
        title_code: `BTA-${Math.floor(100000 + Math.random() * 900000)}`, // Générer un code aléatoire pour le titre
        maturity_date: safeDate,
        issue_date: new Date().toISOString().split('T')[0], // Date actuelle au format ISO sans l'heure
        is_primary: true
      });

      // Appeler le service pour créer un nouveau titre
      try {
        this.titleService.createVirtualTitle(this.assetForm.value).subscribe({
          next: (response) => {
            this.showMessage('success', 'Succès', 'Le titre a été créé avec succès');
            this.assetForm.reset();
            this.router.navigate(['/assets']);
          },
          error: (error) => {
            this.showMessage('error', 'Erreur', `${error.error.message}`);
            this.assetForm.reset();
          }
        });
        this.closeDialog();
      } catch (error: any) {
        this.showMessage('error', 'Erreur', `${error.error.message}`);
        this.assetForm.reset();
      }
    }
  }

  // Fonction d'affichage des messages de retour d'API
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
