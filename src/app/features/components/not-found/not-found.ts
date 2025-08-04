import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {
  protected readonly title = signal('Page non trouvée');
}
