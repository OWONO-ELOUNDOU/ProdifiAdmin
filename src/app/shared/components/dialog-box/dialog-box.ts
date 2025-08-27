import { Component, Input, input } from '@angular/core';

// Import PrimeNG Libraries
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dialog-box',
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.scss'
})
export class DialogBox {
  visible: boolean = false;
  buttonLabel = input<string>('');
  action = input<string>('');

  isOpen = input(false);

  showDialog(event: any) {
    event.preventDefault();
    this.visible = true;
  }

  closeDialog(event: any) {
    event.preventDefault();
    this.visible = false;
  }
}
