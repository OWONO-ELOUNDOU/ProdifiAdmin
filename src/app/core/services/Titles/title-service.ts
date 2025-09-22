import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicTitlesResponse, VirtualAsset } from '../../../shared/models/asset.model';
import { environment } from '../../../../environment/environment';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private readonly endPoint = 'titles/real/';

  // Demo liste des titres
  TitleList: VirtualAsset[] = [];

  // Injecte le service HttpClient
  private http = inject(HttpClient);

  constructor() { }


  /**
   * Méthodes de test de l'application avec des fakes data debut
  */
  addNewTitle(title: VirtualAsset) {
    // Vérifier si une liste de titres existe déjà dans le localStorage et mettre à jour la liste
    const currentList = localStorage.getItem('title_data');
    if (currentList) {
      this.TitleList = JSON.parse(currentList);
      this.TitleList.push(title);
      localStorage.setItem('title_data', JSON.stringify(this.TitleList));
      return;
    }

    // Ajouter le titre à la liste si elle n'existe pas encore et initialiser le localStorage
    this.TitleList.push(title);
    localStorage.setItem('title_data', JSON.stringify(this.TitleList));
  }

  deleteDemoTitle(title_index: string) {
    const currentTitleList: VirtualAsset[] = JSON.parse(localStorage.getItem('title_list') || '');
  }
  /**
   * Méthodes de test de l'application avec des fakes data debut
  */

  // Créer un nouveau titre
  createVirtualTitle(title: VirtualAsset): Observable<VirtualAsset> {
    return this.http.post<VirtualAsset>(`${environment.apiRoutes.v1Route}/${this.endPoint}`, title, {
      headers: {
        "Content-type": "application/json"
      }
    });
  }

  // Récupérer tous les titres
  getAllTitles(): Observable<PublicTitlesResponse> {
    return this.http.get<PublicTitlesResponse>(`${environment.apiRoutes.v1Route}/${this.endPoint}public/`);
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
