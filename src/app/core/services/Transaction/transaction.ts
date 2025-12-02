import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { TransactionListResponse } from '../../../shared/models/transaction.model';
import { UserLoginResponse } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class Transaction {
  private http = inject(HttpClient);
  private readonly endPoint = 'transactions/list';
  private current_user: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');

  constructor() {}

  getAllTransactions(): Observable<TransactionListResponse> {
    return this.http.get<TransactionListResponse>(`${environment.apiRoutes.baseRoute}/${this.endPoint}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }
}
