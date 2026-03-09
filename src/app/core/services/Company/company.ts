import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environment/environment';

import { UserLoginResponse } from '../../models/auth';
import { CompanyClient } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Company {
  private http = inject(HttpClient);
  private readonly endpoint1 = '/add-client';
  private readonly endpoint2 = '/clients';

  private current_user: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');

  constructor() {}

  getAllCustomers(): Observable<CompanyClient[]> {
    return this.http.get<CompanyClient[]>(`${environment.apiRoutes.companyRoute}${this.endpoint2}`, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${this.current_user.access}`
      }
    })
  }

  // fonction pour créer un nouveau client
  createCustomer(data: CompanyClient): Observable<CompanyClient> {
    return this.http.post<CompanyClient>(`${environment.apiRoutes.companyRoute}${this.endpoint1}`, data, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }
}
