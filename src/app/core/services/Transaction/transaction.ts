import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environment/environment';
import { TransactionAction, TransactionListResponse, Transaction as TransactionModel } from '../../../shared/models/transaction.model';
import { UserLoginResponse } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class Transaction {
  private http = inject(HttpClient);
  private readonly endPoint = 'transactions';
  private current_user: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');

  constructor() {}

  // Méthode pour récupérer tous les transactions
  getAllTransactions(): Observable<TransactionListResponse> {
    return this.http.get<TransactionListResponse>(`${environment.apiRoutes.baseRoute}/${this.endPoint}/list`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }

  // Méthode pour approuver une transaction
  approveTransaction(id: string, item: Partial<TransactionModel>): Observable<TransactionModel> {
    return this.http.post<TransactionModel>(`${environment.apiRoutes.baseRoute}/${this.endPoint}/trsctions/${id}/approve/`, item, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${this.current_user.access}`
      }
    })
  }

  // Méthode pour approuver une transaction
  cancelTransaction(id: string, item: TransactionAction): Observable<TransactionModel> {
    return this.http.post<TransactionModel>(`${environment.apiRoutes.baseRoute}/${this.endPoint}/trsctions/${id}/cancel/`, item, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${this.current_user.access}`
      }
    })
  }

  // Méthode pour approuver une transaction
  markPaidTransaction(id: string, item: TransactionAction): Observable<TransactionModel> {
    return this.http.post<TransactionModel>(`${environment.apiRoutes.baseRoute}/${this.endPoint}/trsctions/${id}/mark_paid/`, item, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${this.current_user.access}`
      }
    })
  }

  // Méthode pour approuver une transaction
  settleTransaction(id: string, item: TransactionAction): Observable<TransactionModel> {
    return this.http.post<TransactionModel>(`${environment.apiRoutes.baseRoute}/${this.endPoint}/trsctions/${id}/settle/`, item, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${this.current_user.access}`
      }
    })
  }
}
