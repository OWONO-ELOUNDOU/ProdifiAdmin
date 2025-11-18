import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environment/environment';
import { Fund } from '../../../shared/models/asset.model';
import { UserLoginResponse } from '../../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundsService {
  private readonly endPoint = '';
  private readonly current_user: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');

  private http = inject(HttpClient);

  constructor() {}

  // Fonction de création de fonds de placements
  createNewFund(fund: Fund): Observable<Fund> {
    return this.http.post<Fund>(`${environment.apiRoutes.v1Route}/${this.endPoint}`, fund, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.current_user.access}`
      }
    })
  }
  
}
