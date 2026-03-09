import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';

// Import PrimeNG librairies
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

// Import Services
import { UsersListService } from '../../../core/services/UsersList/users-list-service';
import { CurrentUser, KYC } from '../../../core/models/auth';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, ToastModule, ButtonModule, FormsModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
  providers: [MessageService]
})
export class UserDetails implements OnInit {
  protected title = signal('Détails utilisateur');
  currentUser = signal<CurrentUser | null>(null);
  currentUserKyc = signal<KYC | null>(null);
  currentUserId = signal('');
  errorMessage = signal('');
  sectionsValidation = signal(['']);

  // Injection de services
  private router = inject(Router);
  private messageService = inject(MessageService);
  private userListService = inject(UsersListService);

  // Formulaire de validation du KYC
  KYCForm: FormGroup = new FormGroup({
    kyc_id: new FormControl(''),
    section: new FormControl(['']),
    status: new FormControl(''),
    rejection_reason: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
    this.currentUserId.set(localStorage.getItem('currentUserId') || '');
    console.log(this.currentUserId());

    this.fetchUserDetails();
  }

  checkValidatedSection(el: string) {
    this.sectionsValidation().push(el);
    console.log(this.sectionsValidation());
  }

  fetchUserDetails() {
    try {
      this.userListService.getUserDetails(this.currentUserId()).subscribe({
        next: (data) => {
          console.log(data);
          this.currentUser.set(data);

          this.fetchUserKycInfo();
        },
        error: (error) => {
          console.log('Erreur lors le l\'affichage des informations utilisateur', error.error.message);
          this.showMessage('danger', 'Erreur', error.error.message);
        }
      })
    } catch (error: any) {
      console.log('Erreur lors le l\'affichage des informations utilisateur', error.error.message);
      this.showMessage('danger', 'Erreur', error.error.message);
    }
  }

  fetchUserKycInfo() {
    try {
      this.userListService.getUserKycDetails(this.currentUserId()).subscribe({
        next: (data) => {
          console.log(data);
          this.currentUserKyc.set(data);
        },
        error: (error) => {
          console.log(error.error);
          this.errorMessage.set(error.error);
          this.showMessage('danger', 'Erreur', error.error);
        }
      })
    } catch (error: any) {
      console.log(error.error);
      this.errorMessage.set(error.error);
      this.showMessage('danger', 'Erreur', error.error)
    }
  }

  onValidateKyc() {
    // Complétion des champs du formulaire du KYC
    this.KYCForm.patchValue({
      kyc_id: this.currentUserKyc()?.id,
      status: 'approved',
      rejection_reason: ''
    });

    console.table(this.KYCForm.value);

    try {
      this.userListService.validateUserKyc(this.KYCForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.showMessage('success', 'Succès', 'Le KYC a été Validé');
        },
        error: (error) => {
          console.log(error);
          this.showMessage('danger', 'Erreur', `Erreur lors de la validation du KYC, ${error.error.message}`);
        }
      })
    } catch (error) {
        console.log(error)
        this.showMessage('danger', 'Erreur', 'Une erreur est survenue');
    }
  }

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
