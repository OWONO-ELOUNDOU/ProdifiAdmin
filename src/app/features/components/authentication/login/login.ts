import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Auth } from '../../../../core/services/Auth/auth';

// Import primeng librairies
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService]
})
export class Login {
  private authService = inject(Auth);
  private messageService = inject(MessageService);
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor() {}

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      console.table(this.loginForm.value);

      const { email, password } = this.loginForm.value;
      const safeEmail = email ?? '';
      const safePassword = password ?? '';
      
      try {
        this.authService.login(safeEmail, safePassword).subscribe((data: any) => {
          this.isLoading = false;
          console.log(data);
          this.showNotification('success');
        })
      } catch (error: any) {
        console.log(error.message);
        this.showNotification('echec');
      }
    } else {
      this.loginForm.markAsTouched();
    }
  }

  showNotification(state: string) {
    this.messageService.add({
      severity: state === 'success' ? state : 'danger',
      summary: state === 'success' ? 'Succès' : 'Échec',
      detail: state === 'success' ? 'Connexion Réussie' : 'Échec de la connexion',
      life: 3000
    })
  }
}
