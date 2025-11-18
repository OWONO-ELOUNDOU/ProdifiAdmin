import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import PrimeNG Libraries
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// Import service titres
import { TitleService } from '../../../core/services/Titles/title-service';
import { VirtualAsset, TitleDurationWeeksList, TitleTypeList, TitleStateList } from '../../models/asset.model';
import { UserLoginResponse } from '../../../core/models/auth';

// Import Utils
import { addWeeksToToday } from '../../../utils/date.utils';

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
  title_id = input<string>('');
  buttonLabel = input<string>('');
  current_user!: UserLoginResponse;
  maturity_date = signal<string>('');
  selectedDate = signal<string>('');

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
    maturity_date: new FormControl({ value: '', disabled: false }),
    bta_duration_weeks: new FormControl(0, [Validators.required, Validators.min(3)]),
    issue_date: new FormControl(''),
  });

  typeArr = TitleTypeList;
  stateArr = TitleStateList;
  btaDurationArr = TitleDurationWeeksList;

  constructor() {

  }

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    this.current_user = JSON.parse(localStorage.getItem('current_firm') || '{}');
  }

  get f() {
    return this.assetForm.controls;
  }

  computedDurationWeeks(event: any) {
    const selectedDuration = event.target.value;
    this.selectedDate.set(addWeeksToToday(selectedDuration));
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

      this.assetForm.patchValue({
        maturity_date: addWeeksToToday(this.assetForm.value.bta_duration_weeks),
        is_primary: true
      });

      try {
        this.titleService.updateReelTitle(this.assetForm.value, this.title_id()).subscribe({
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

      this.assetForm.patchValue({
        title_code: `BTA-${Math.floor(100000 + Math.random() * 900000)}`, // Générer un code aléatoire pour le titre
        maturity_date: addWeeksToToday(this.assetForm.value.bta_duration_weeks), // Ajouter le nombre de semaines à la date actuelle
        issue_date: new Date().toISOString().split('T')[0], // Date actuelle au format ISO sans l'heure
        is_primary: true
      });
      console.log('Form Data:', this.assetForm.value);

      // Appeler le service pour créer un nouveau titre
      
      try {
        this.titleService.createRealTitle(this.assetForm.value).subscribe({
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
