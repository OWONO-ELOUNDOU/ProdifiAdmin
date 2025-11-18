import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import PrimeNG librairies
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Company } from '../../../core/services/Company/company';
import { UserLoginResponse } from '../../../core/models/auth';

@Component({
  selector: 'app-customers-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Dialog, ButtonModule, ToastModule],
  templateUrl: './customers-form.html',
  styleUrl: './customers-form.scss',
  providers: [MessageService]
})
export class CustomersForm {
  visible: boolean = false;

  // Injection de service
  private companyService = inject(Company);
  private messageService = inject(MessageService);

  // Formulaire de création d'un client pour la société
  customerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    push_token: new FormControl('')
  })

  constructor() {}

  // fonction getter pour récupérer les propriétés du formulaire et leur valeur
  get f() {
    return this.customerForm.controls;
  }

  // fonction pour afficher le formulaire
  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  // fonction pour fermer le formulaire
  closeDialog() {
    this.visible = false;
  }

  // fonction pour envoi du formulaire
  onSubmit() {
    // Vérification de la validité du formulaire
    if (this.customerForm.valid) {
      console.table('Customer form data:', this.customerForm.value);
      const current_user: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');
      this.customerForm.patchValue({ push_token: current_user.access });
      console.table('Customer form data:', this.customerForm.value);

      try {
        this.companyService.createCustomer(this.customerForm.value).subscribe({
          next: (response) => {
            console.log('Customer created successfully:', response);
            this.showMessage('success', 'Succès', 'Client créé avec succès');
            this.closeDialog();
            this.customerForm.reset();
          },
          error: (error) => {
            console.error('Error creating customer:', error);
            this.showMessage('error', 'Erreur', "Échec de la création du client");
          }
        });
      } catch (error) {
        this.showMessage('error', 'Erreur', "Une erreur inattendue s'est produite");
      }

    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  // fonction pour afficher des messages de retour d'api
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
