import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Import models here
import { CurrentUser, UserLoginResponse } from '../../models/auth';
import { environment } from '../../../../environment/environment';
import { ClientListResponse, CompaniesListResponse } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  private http = inject(HttpClient);
  private apiEndpoint = '/admin'; // Remplacez par l'URL réelle de votre API
  currentUser: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');

  contructor() {}

  fetchUsers(): Observable<ClientListResponse[]> {
    return this.http.get<ClientListResponse[]>(`${environment.apiRoutes.baseRoute}${this.apiEndpoint}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access}`
      }
    });
  }

  getUserDetails(userId: string): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${environment.apiRoutes.baseRoute}${this.apiEndpoint}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access}`
      }
    })
  }

  getUserKycDetails(userId: string) {
    return this.http.get(`${environment.apiRoutes.baseRoute}${this.apiEndpoint}/kyc/by-user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access}`
      }
    })
  }

  fetchCompanies(): Observable<CompaniesListResponse[]> {
    return this.http.get<CompaniesListResponse[]>(`${environment.apiRoutes.baseRoute}${this.apiEndpoint}/companies/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access}`
      }
    });
  }
}
