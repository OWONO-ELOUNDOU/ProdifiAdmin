import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4200,
    strictPort: true,
    allowedHosts: true  // Accepte tous les hôtes
  }
});