import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Import du service authentification
import { Auth } from '../../../core/services/Auth/auth';

// Import du model
import { UserLoginResponse } from '../../../core/models/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  protected readonly title = signal('ProdifiAdmin');
  isOpen = false;

  // Injection des services
  private router = inject(Router);
  private authService = inject(Auth);

  currentFirm!: UserLoginResponse; // utilisateur actuel

  constructor() {

  }

  ngOnInit(): void {
    // Récupère l'utilisateur actuel
    this.currentFirm = JSON.parse(localStorage.getItem('current_firm') || '');
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Fonction pour afficher le bouton de déconnexion
  showLogoutButton() {
    this.isOpen = !this.isOpen;
  }

  // Méthode pour la déconnexion de l'utilisateur
  onSignOut() {
    this.authService.logout();
  }
}
