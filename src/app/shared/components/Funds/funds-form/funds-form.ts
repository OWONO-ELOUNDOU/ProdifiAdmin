import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import PrimeNG Libraires
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from "primeng/table";

// Import Models
import { fundTypeList, riskLevelList } from '../../../models/asset.model';
import { FundsService } from '../../../../core/services/Funds/funds-service';


@Component({
  selector: 'app-funds-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Dialog, ButtonModule, ToastModule, CheckboxModule, TableModule],
  templateUrl: './funds-form.html',
  styleUrl: './funds-form.scss',
  providers: [MessageService]
})
export class FundsForm {
  visible: boolean = false;
  fundTypeList = fundTypeList;
  fundRiskLevel = riskLevelList;

  // Injection des services
  private router = inject(Router);
  private fundService = inject(FundsService);
  private messageService = inject(MessageService);

  // Formulaire pour la création d'un fond de placement
  fundForm: FormGroup = new FormGroup({
    code: new FormControl(''),
    name: new FormControl('', Validators.required),
    management_company: new FormControl(''),
    fund_type: new FormControl('', Validators.required),
    nav_per_unit: new FormControl(0, [Validators.required, Validators.min(5)]),
    nav_date: new FormControl(''),
    expense_ratio: new FormControl(0, [Validators.required, Validators.min(7)]),
    min_subscription_amount: new FormControl(0, [Validators.required, Validators.min(10)]),
    entry_fee_rate: new FormControl(0, [Validators.required, Validators.max(100)]),
    exit_fee_rate: new FormControl(0, [Validators.required, Validators.max(100)]),
    risk_level: new FormControl('', Validators.required),
    is_open: new FormControl(true),
    verified: new FormControl(true)
  });

  constructor() { }

  // fonction getter pour récupérer les propriétés du formulaire et leur valeur
  get f() {
    return this.fundForm.controls;
  }

  // fonction pour afficher le formulaire
  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  // Fonction pour fermer le formulaire
  closeDialog() {
    this.visible = false;
  }


  // fonction pour envoi du formulaire
  onSubmit() {
    // Vérification de la validité du formulaire
    if(this.fundForm.valid) {
      console.table('Form fund data: ', this.fundForm.value);

      this.fundForm.patchValue({
        code: `FUND-${Math.floor(100000 + Math.random() * 900000)}`, // Générer un code aléatoire pour le fond de placement
        management_company: 'a53b4cc9-e7de-49ee-ba12-131d0990cbb4'
      });
      console.table('Form fund data: ', this.fundForm.value);

      try {
        this.fundService.createNewFund(this.fundForm.value).subscribe({
          next: (data) => {
            this.showMessage('success', 'Succès', 'Le fond a été crée avec succès');
            console.log(data);
          },
          error: (error) => {
            this.showMessage('danger', 'Succès', error.message);
            console.log(error);
          }
        })
      } catch (error) {
          console.log(error);
      }
    }
  }

  // fonction pour affichage des messages de retour d'api
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
