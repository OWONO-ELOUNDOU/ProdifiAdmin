import { inject, Injectable } from '@angular/core';

import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { UserLoginResponse } from '../../models/auth';
import { Observable } from 'rxjs';
import { Topups, WalletSummary, Withdrawals, WithdrawalsHistoryResponse } from '../../../shared/models/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  // Service logic goes here
  private http = inject(HttpClient);

  private balanceEndpoint = environment.apiRoutes.baseRoute + '/transactions/wallet';
  private adminEndpoint = environment.apiRoutes.baseRoute + '/transactions/admin/wallet';
  private currentUser: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');

  constructor() { }

  // Method to get wallet details
  getWalletDetails(): Observable<WalletSummary> {
    return this.http.get<WalletSummary>(`${this.balanceEndpoint}/summary`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access}`
      }
    });
  }

  // Méthode pour obtenir l'historique des retraits
  getWithdrawalHistory(): Observable<WithdrawalsHistoryResponse> {
    return this.http.get<WithdrawalsHistoryResponse>(`${this.adminEndpoint}/withdrawals`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access}`
      }
    });
  }

  // Méthode pour obtenir l'historique des recharges
  getTopupsHistory(): Observable<Topups[]> {
    return this.http.get<Topups[]>(`${this.adminEndpoint}/topups`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access}`
      }
    });
  }
}
