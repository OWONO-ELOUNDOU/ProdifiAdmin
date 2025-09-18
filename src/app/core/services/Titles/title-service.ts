import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VirtualAsset } from '../../../shared/models/asset.model';
import { environment } from '../../../../environment/environment';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private readonly endPoint = 'titles/real/';

  // Injecte le service HttpClient
  private http = inject(HttpClient);

  constructor() { }

  // Créer un nouveau titre
  createVirtualTitle(title: VirtualAsset): Observable<VirtualAsset> {
    return this.http.post<VirtualAsset>(`${environment.apiRoutes.v1Route}/${this.endPoint}`, title, {
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  // Récupérer tous les titres
  getAllTitles(): Observable<VirtualAsset[]> {
    return this.http.get<VirtualAsset[]>(`${environment.apiRoutes.v1Route}/${this.endPoint}`);
  }

  // Récupérer les informations d'un titre spécifique
  getSingleTitle(title_code: string): Observable<VirtualAsset> {
    return this.http.get<VirtualAsset>(`${environment.apiRoutes.v1Route}${this.endPoint}/${title_code}`);
  }

  // Modifier les informations d'un titre
  updateTitle(title: VirtualAsset): Observable<VirtualAsset> {
    return this.http.put<VirtualAsset>(`${environment.apiRoutes.v1Route}/${this.endPoint}/${title.title_code}`, title, {
      headers: { "Content-type": "application/json" }
    });
  }

  // Suppression d'un title
  deleteTitle(title_code: string) {
    return this.http.delete(`${environment.apiRoutes.v1Route}${this.endPoint}/${title_code}`);
  }
}
