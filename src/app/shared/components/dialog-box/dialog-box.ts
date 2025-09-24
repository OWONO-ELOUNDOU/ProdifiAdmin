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

  titleData = signal<VirtualAsset[]>([]); // Tableau pour stocker les titres depuis le backend

  private messageService = inject(MessageService);
  private titleService = inject(TitleService);

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
    issue_date: new FormControl(new Date().toISOString()),
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

  // Fonction pour récupérer les titres depuis le backend
  onFetchData() {
    try {
      this.titleService.getAllTitles().subscribe({
        next: (data) => {
          console.log(data);
          this.titleData.set(data.results);
        },
        error: (error) => {
          console.log('aucun titre existant', error.message);
        }
      })
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors du chargement des titres veuillez réessayer plus tard',
        life: 3000,
        closable: true,
      });
    }
  }


  // fonction pour enregistrer les titres dans la liste de test
  onTestSubmit() {
    if (this.assetForm.valid) {
      const safeDate = new Date(this.assetForm.value.maturity_date).toLocaleDateString('en-CA'); // Formater la date au format ISO sans l'heure
      this.assetForm.patchValue({
        title_code: `BTA-${Math.floor(100000 + Math.random() * 900000)}`, // Générer un code aléatoire pour le titre
        maturity_date: safeDate, // Formater la date au format ISO sans l'heure
        is_primary: false
      });
      console.log(this.assetForm.value);

      // Appeler le service pour créer un nouveau titre
      try {
        this.titleService.createVirtualTitle(this.assetForm.value).subscribe({
          next: (response) => {
            console.log('Titre créé avec succès:', response);
            this.assetForm.reset();
          },
          error: (error) => {
            console.error('Erreur lors de la création du titre:', error);
            this.assetForm.reset();
          }
        });
        this.closeDialog();
      } catch (error) {
        this.messageService.add({
          severity: 'danger',
          summary: 'Erreur',
          detail: 'Le titre n\'a pas pu être enregistré',
          life: 3000,
          closable: true
        });
        this.assetForm.reset();
      }
    }
  }

  onSubmit() {
    // Vérifier si le formulaire est valide
    if (this.assetForm.valid) {
      /*
      this.assetForm.patchValue({
        title_code: `BTA-${Math.floor(100000 + Math.random() * 900000)}`, // Générer un code aléatoire pour le titre
        is_primary: false,
      });
      */
      console.log(this.assetForm.value);

      // Appeler le service pour créer un nouveau titre
      try {
        this.titleService.createVirtualTitle(this.assetForm.value).subscribe({

          // Gérer la réponse du serveur
          next: (response) => {
            console.log('Titre créé avec succès:', response);

            // Afficher une notification de succès, ferme la boîte de dialogue et réinitialise le formulaire
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Le titre a été ajouté avec succès',
              life: 3000,
              closable: true,
            });
            this.closeDialog();
            this.assetForm.reset();
          },
          // Gérer les erreurs
          error: (error) => {
            console.error('Erreur lors de la création du titre:', error);
          }
        });
      } catch (error) {
        console.error('Erreur lors de la création du titre:', error);
      }

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
