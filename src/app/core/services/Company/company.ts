import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Company {
  private readonly endpoint = 'company/clients'
  private http = inject(HttpClient);

  constructor() {}

  getAllClients() {
    this.http.get(environment.apiRoutes + this.endpoint, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }
}
