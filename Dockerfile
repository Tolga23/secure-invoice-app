FROM node:20.11.1-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/secure-invoice-app /usr/share/nginx/html
EXPOSE 80
