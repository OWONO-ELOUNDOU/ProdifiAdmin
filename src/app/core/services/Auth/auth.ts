import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../../environment/environment';
import { BrokerageFirm } from '../../../shared/models/user.model';


// Sociétés prédéfinies pour la demo
  const DEMO_FIRMS = [
    {
      name: 'Express Financial',
      nui: '56513841351-XXX',
      email: 'userdemo01@example.com',
      password: 'admin1234',
      address: 'CENTRE - Yaoundé',
      contact_info: '699999999',
      is_active: true,
      is_user: true,
      created_at: '1996-08-27T10:00:00Z'
    },
    {
      name: 'Atlantic bank',
      nui: '9884621651981-XXX',
      email: 'userdemo02@example.com',
      password: 'admin12345678',
      address: 'LITTORAL - Douala',
      contact_info: '699999000',
      is_active: true,
      is_user: true,
      created_at: '1986-08-27T13:55:00Z'
    }
  ]

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly endPoint = 'auth/login';

  // Injection du service http Client pour les requêtes avec les apis backend
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentFirmSubject = new BehaviorSubject<BrokerageFirm | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  // **************** GESTION DE L'AUTHENTIFICATION ****************
  private checkAuthStatus() {
    const firm = this.getStoredFirm();

    if (firm) {
      this.isAuthenticatedSubject.next(true);
    }
  }


  private getStoredFirm(): BrokerageFirm | null {
    const storedFirm = localStorage.getItem('current_firm') || sessionStorage.getItem('current_firm');
    return null;
  }

  // Méthode de connexion avec les fake data utilisateurs
  loginWithDemoUser(email: string, password: string) {
    DEMO_FIRMS.forEach((firm) => {
      if (firm.email === email && firm.password === password) {
        this.isAuthenticatedSubject.next(true);
        this.currentFirmSubject.next(firm);
        localStorage.setItem('current_firm', JSON.stringify(firm));
        this.router.navigate(['/home']);
      }

      return 'Connexion réussie';
    });

    return 'Société non toruvée';
  }

  private clearStoredData() {
    localStorage.removeItem('current_firm');
  }

  get currentFirm$() {
    return this.currentFirmSubject.asObservable();
  }

  // Méthode de connexion avec les apis backend
  login(email: string, password: string) {
    return this.http.post(environment.apiRoutes + this.endPoint, {email, password}, {
      headers: {
        "Content-Type": 'application/json'
      }
    })
  }

  logout() {
    // Nettoyer les données
    this.clearStoredData();

    // Rediriger vres la page de connexion
    this.router.navigate(['/login']);
  }
}
