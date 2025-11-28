import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environment/environment';
import { UserLoginResponse } from '../../models/auth';
import { PublicRealTitlesResponse, PublicVirtualTitlesResponse, ReelAsset, VirtualAsset } from '../../../shared/models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private readonly realEndPoint = 'titles/real/';
  private readonly virtualEndPoint = 'titles/virtual/';
  private current_user: UserLoginResponse = JSON.parse(localStorage.getItem('current_firm') || '{}');

  // Demo liste des titres
  TitleList: VirtualAsset[] = [];

  // Injecte le service HttpClient
  private http = inject(HttpClient);

  constructor() { }


  /**
   * Méthodes de communication avec l'API pour la gestion des titres réels
   */
  // Créer un nouveau titre
  createRealTitle(title: ReelAsset): Observable<ReelAsset> {
    return this.http.post<ReelAsset>(`${environment.apiRoutes.v1Route}/${this.realEndPoint}`, title, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }

  // Récupérer tous les titres
  getAllRealTitles(): Observable<PublicRealTitlesResponse> {
    return this.http.get<PublicRealTitlesResponse>(`${environment.apiRoutes.v1Route}/${this.realEndPoint}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }

  // Récupérer les informations d'un titre spécifique
  getReelTitleDetails(title_code: string): Observable<ReelAsset> {
    return this.http.get<ReelAsset>(`${environment.apiRoutes.v1Route}/${this.realEndPoint}${title_code}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }

  // activattion du titre réel (DRAFT --> ACTIVE)
  activateRealTitle(id: any, title: ReelAsset) {
    return this.http.post(`${environment.apiRoutes.v1Route}/${this.realEndPoint}${id}/activate`, title, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    })
  }

  // Modifier les informations d'un titre
  updateReelTitle(title: VirtualAsset, title_id: string): Observable<VirtualAsset> {
    return this.http.put<VirtualAsset>(`https://prodifi.proditech-digital.com/api/v1/titles/real/${title_id}`, title, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }

  // Suppression d'un title
  deleteReelTitle(title_code: string) {
    return this.http.delete(`${environment.apiRoutes.v1Route}/${this.realEndPoint}${title_code}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }


  /**
   * Méhodes de communication avec l'API pour la gestion des titres virtuels
   */

  // fonction de création de titre virtuel
  createVirtualTitle(title: VirtualAsset): Observable<VirtualAsset> {
    return this.http.post<VirtualAsset>(`${environment.apiRoutes.v1Route}/${this.virtualEndPoint}`, title, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }


  // fonction de création de titre virtuel
  getAllVirtualTitle(): Observable<PublicVirtualTitlesResponse> {
    return this.http.get<PublicVirtualTitlesResponse>(`${environment.apiRoutes.v1Route}/${this.virtualEndPoint}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.current_user.access}`
      }
    });
  }
}
