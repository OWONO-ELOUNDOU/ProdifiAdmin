import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly title = signal('ProdifiAdmin');
  private router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
