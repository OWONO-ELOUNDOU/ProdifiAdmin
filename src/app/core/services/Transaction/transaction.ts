import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Transaction {
  private http = inject(HttpClient);
  private readonly endPoint = 'transactions';

  constructor() {}

  
}
