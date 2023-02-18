FROM nginx:1.23.3-alpine
COPY dist /usr/share/nginx/html
