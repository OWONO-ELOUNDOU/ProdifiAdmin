import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG librairies
import { ButtonModule } from 'primeng/button';

// Import service
import { Auth } from '../../../core/services/Auth/auth';

// Import Modèles
import { KYC, UserLoginResponse } from '../../../core/models/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ButtonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  protected readonly title = signal('Profile');
  private authService = inject(Auth); // Injection du service d'authentification

  current_user!: UserLoginResponse;
  current_user_kyc = signal<KYC | null>(null);
  isAccessVisible = false;
  isRefreshVisible = false;

  constructor() {}

  ngOnInit(): void {
    // Récupérer le profil de l'utilisateur connecté
    this.current_user = JSON.parse(localStorage.getItem('current_firm') || '{}');
    console.log(this.current_user);
    this.onFecthProfile(this.current_user.access);
    this.fetchProfileKYC();
  }

  // Fonction pour masquer ou afficher le token d'accès
  toggleAccessVisibility() {
    this.isAccessVisible = !this.isAccessVisible;
    console.log(this.isAccessVisible)
  }

  // Fonction pour masquer ou afficher le token d'actualisation
  toggleRefreshVisibility() {
    this.isRefreshVisible = !this.isRefreshVisible;
    console.log(this.isRefreshVisible)
  }

  onFecthProfile(access_token: string) {
    try {
      this.authService.getProfile(access_token).subscribe({
        next: (profile) => {
          console.log(profile);
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  fetchProfileKYC() {
    try {
      this.authService.getProfileKyc().subscribe({
        next: (kyc) => {
          console.log(kyc);
          this.current_user_kyc.set(kyc);
        },
        error: (error) => {
          console.error('Error fetching KYC info:', error);
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  validateKYC() {
    
  }
}
