# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --legacy-peer-deps

# Copier le reste des fichiers
COPY . .

# Build l'application
RUN npm run build

# Stage 2: Serve avec Nginx
FROM nginx:alpine

# Copier les fichiers buildés depuis /app/dist/ProdifiAdmin/browser
COPY --from=build /app/dist/ProdifiAdmin/browser /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]