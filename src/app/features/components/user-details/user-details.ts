import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

// Import Services
import { UsersListService } from '../../../core/services/UsersList/users-list-service';
import { CurrentUser } from '../../../core/models/auth';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails implements OnInit {
  protected title = signal('Détails utilisateur');
  currentUserId = signal('');
  currentUser = signal<CurrentUser | null>(null)

  // Injection de services
  private router = inject(Router);
  private userListService = inject(UsersListService);

  constructor() { }

  ngOnInit(): void {
    this.currentUserId.set(localStorage.getItem('currentUserId') || '');
    console.log(this.currentUserId());

    this.fetchUserDetails();
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
        }
      })
    } catch (error: any) {
      console.log('Erreur lors le l\'affichage des informations utilisateur', error.error.message);
    }
  }

  fetchUserKycInfo() {
    try {
      this.userListService.getUserKycDetails(this.currentUserId()).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    } catch (error: any) {
      console.log(error.error);
    }
  }
}
