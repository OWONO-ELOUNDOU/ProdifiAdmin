import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualAsset } from '../../../shared/models/asset.model';
import { environment } from '../../../../environment/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Assets {
  private readonly endPoint = 'titles/virtual/';

  private http = inject(HttpClient);

  constructor() {}
}
