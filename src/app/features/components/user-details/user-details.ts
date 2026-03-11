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
import { CurrentUser, KYC, KYCValidation } from '../../../core/models/auth';

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
  rejectionReason = signal('');
  sectionsValidation = signal('');

  isValidating = signal<boolean>(false);
  isRejecting = signal<boolean>(false);
  currentSection = signal<string>('1');
  progressBarValue = signal<number>(0);

  // Injection de services
  private router = inject(Router);
  private messageService = inject(MessageService);
  private userListService = inject(UsersListService);

  // Formulaire de validation du KYC
  KYCForm: FormGroup = new FormGroup({
    kyc_id: new FormControl(''),
    section: new FormControl(''),
    status: new FormControl(''),
    rejection_reason: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
    this.currentUserId.set(localStorage.getItem('currentUserId') || '');
    console.log(this.currentUserId());

    this.fetchUserDetails();
  }

  increaseProgressValue() {
    this.progressBarValue.update(value => value + 1);
  }

  decreaseProgressValue() {
    this.progressBarValue.update(value => value - 1);
  }

  validateSection(el: string) {
    this.sectionsValidation.set(el);
    console.log('Valide',this.sectionsValidation());
  }

  rejectSection(el: string) {
    this.rejectionReason.set(el);
    console.log('Rejeté',this.rejectionReason());
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

  validateKycSection(sectionTitle: string, sectionId: string) {
    this.currentSection.set(sectionId);
    // Complétion des champs du formulaire du KYC
    this.KYCForm.patchValue({
      kyc_id: this.currentUserKyc()?.id,
      section: sectionTitle,
      status: 'approved',
      rejection_reason: ''
    });

    console.table(this.KYCForm.value);
    this.isValidating.set(true);
    try {
      this.userListService.validateUserKyc(this.KYCForm.value).subscribe({
        next: (data) => {
          this.isValidating.set(false);
          console.log(data);
          setTimeout(() => {
            this.showMessage('success', 'Succès', 'La section a été Validée');
          }, 2000);
          window.location.reload();
        },
        error: (error) => {
          this.isValidating.set(false);
          console.log(error);
          this.showMessage('danger', 'Erreur', `Erreur lors de la validation de la section, ${error.error.message}`);
        }
      })
    } catch (error) {
        this.isValidating.set(false);
        console.log(error)
        this.showMessage('danger', 'Erreur', 'Une erreur est survenue');
    }
  }

  rejectKycSection(sectionTitle: string, sectionId: string) {
    this.currentSection.set(sectionId);
    // Complétion des champs du formulaire du KYC
    this.KYCForm.patchValue({
      kyc_id: this.currentUserKyc()?.id,
      section: sectionTitle,
      status: 'rejected',
      rejection_reason: sectionTitle + ' invalide'
    });

    console.table(this.KYCForm.value);
    this.isRejecting.set(true);
    try {
      this.userListService.validateUserKyc(this.KYCForm.value).subscribe({
        next: (data) => {
          this.isRejecting.set(false);
          console.log(data);
          setTimeout(() => {
            this.showMessage('success', 'Succès', 'La section a été Rejeté');
          }, 2000);
          window.location.reload();
        },
        error: (error) => {
          this.isRejecting.set(false);
          console.log(error);
          this.showMessage('danger', 'Erreur', `Erreur lors du rejet de la section, ${error.error.message}`);
        }
      })
    } catch (error) {
      this.isRejecting.set(false);
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
