import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Customers Interface
interface Customer {
  name: string;
  phone: string;
  assets_bought: string;
  image: string;
  quantity: string;
  total: string;
  date: string;
}

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss'
})
export class Customers {
  customersData = signal<Customer[]>([]);
}
