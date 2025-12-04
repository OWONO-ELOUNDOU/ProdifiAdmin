import { Routes } from '@angular/router';
import { Home } from './features/components/home/home';
import { authGuard } from './core/Guard/auth-guard';

export const routes: Routes = [
    { path: '' , component: Home, canActivate: [authGuard] },
    { path: 'home', component: Home, canActivate: [authGuard] },
    {
        path: 'login',
        loadComponent: () => import('./features/components/authentication/login/login').then(m => m.Login),
    },
    {
        path: 'assets',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/assets/assets').then(m => m.Assets),
    },
    {
        path: 'funds',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/Titles/funds/funds').then(m => m.Funds),
    },
    {
        path: 'wallet',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/wallet/wallet').then(m => m.Wallet),
    },
    /*
    {
        path: 'customers',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/customers/customers').then(m => m.Customers),
    },
    */
    {
        path: 'transactions',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/transactions/transactions').then(m => m.Transactions),
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/profile/profile').then(m => m.Profile),
    },
    {
        path: 'users',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/users/users').then(m => m.Users),
    },
    {
        path: 'users/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./features/components/user-details/user-details').then(m => m.UserDetails),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./features/components/not-found/not-found').then(m => m.NotFound),
    }
];
