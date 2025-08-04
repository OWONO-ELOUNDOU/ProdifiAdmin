import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  get f() {
    return this.loginForm.controls;
  }

  submit() {
    if (this.loginForm.valid) {
      console.table(this.loginForm.value);
    } else {
      this.loginForm.markAsTouched();
    }
  }
}
