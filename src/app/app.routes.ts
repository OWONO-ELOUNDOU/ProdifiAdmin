import { Routes } from '@angular/router';
import { Home } from './features/components/home/home';

export const routes: Routes = [
    { path: '' , component: Home, },
    { path: 'home', component: Home, },
    {
        path: 'login',
        loadComponent: () => import('./features/components/authentication/login/login').then(m => m.Login),
    },
    {
        path: 'assets',
        loadComponent: () => import('./features/components/assets/assets').then(m => m.Assets),
    },
    {
        path: 'customers',
        loadComponent: () => import('./features/components/customers/customers').then(m => m.Customers),
    },
    {
        path: 'transactions',
        loadComponent: () => import('./features/components/transactions/transactions').then(m => m.Transactions),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./features/components/not-found/not-found').then(m => m.NotFound),
    }
];
