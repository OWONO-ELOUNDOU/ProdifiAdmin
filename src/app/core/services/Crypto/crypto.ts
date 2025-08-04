import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Crypto {
  private http = inject(HttpClient);

  private apiUrl = 'https://api.coingecko.com/api/v3/';

  getMarketData(vsCurrency = 'usd'): Observable<any> {
    return this.http.get(`${this.apiUrl}coins/markets`, {
      params: {
        vs_currency: vsCurrency,
        order: 'market_cap_desc',
        per_page: '10',
        page: '1',
        sparkline: 'false'
      }
    });
  }
}
