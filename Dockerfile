FROM nginx:1.15.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html
