import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import PrimeNG lirairies
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// Import components
import { FundsStatisticCard } from '../../../shared/components/Funds/funds-statistic-card/funds-statistic-card';
import { CustomersForm } from '../../../shared/components/customers-form/customers-form';

// Customers Interface
import { CompanyClient } from '../../../shared/models/user.model';
import { Company } from '../../../core/services/Company/company';
@Component({
  selector: 'app-customers',
  imports: [CommonModule, ButtonModule, TableModule, CustomersForm, FundsStatisticCard],
  templateUrl: './customers.html',
  styleUrl: './customers.scss'
})
export class Customers implements OnInit {
  customersData = signal<CompanyClient[]>([]);

  private customerService = inject(Company);

  constructor() { }

  ngOnInit(): void {
    this.fecthCustomersData();
  }

  fecthCustomersData(): void {
    try {
      this.customerService.getAllCustomers().subscribe({
        next: (data: CompanyClient[]) => {
          this.customersData.set(data);
        },
        error: (error) => {
          console.error('Error fetching customers data:', error);
        }
      })
    } catch (error) {
      console.error('Unexpected error fetching customers data:', error);
    }
  }
}
