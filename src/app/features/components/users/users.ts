import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Import PrimeNG Modules Here
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';

// Import services and models here
import { UsersListService } from '../../../core/services/UsersList/users-list-service';
import { ClientListResponse } from '../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TableModule, ToastModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  providers: [MessageService]
})
export class Users implements OnInit {
  // Component Signals and Properties Here
  protected title = signal('Utilisateurs');
  clientsList = signal<ClientListResponse[]>([]); // Liste des clients sur la plateforme
  companiesList = signal<ClientListResponse[]>([]); // Liste des clients sur la plateforme

  // Inject Services Here
  private router = inject(Router);
  private messageService = inject(MessageService);
  private usersListService = inject(UsersListService);

  constructor() {}

  ngOnInit(): void {
    this.fecthUsers();
    this.fecthCompanies();
  }

  fecthUsers() {
    // Logic to fetch users will go here
    try {
      this.usersListService.fetchUsers().subscribe({
        next: (users) => {
          console.log('Users fetched successfully:', users);
          this.clientsList.set(users);
        },
        error: (error) => {
          console.error('Error fetching users:', error.error.message);
        }
      })
    } catch (error: any) {
      console.log('Unexpected error fetching users:', error.error.message);
    }
  }

  fecthCompanies() {
    // Logic to fetch companies will go here
    try {
      this.usersListService.fetchCompanies().subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log('Error fetching companies', error.error.message);
        }
      })
    } catch (error: any) {
      console.log('Unexpected error fetching users:', error.error.message)
    }
  }

  navigateTo(id: string) {
    localStorage.setItem('currentUserId', id);
    this.router.navigate([`/users/${id}`]);
  }

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
