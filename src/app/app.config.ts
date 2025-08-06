import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, enableProdMode, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// Improting firebase configuration
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environment/environment';

import { routes } from './app.routes';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ]
};
