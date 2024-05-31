# build environment
FROM node:20-alpine as build

WORKDIR /app

RUN npm install -g pnpm

COPY frontend/package.json /app/package.json

RUN pnpm install

COPY . /app

RUN pnpm run build

# production environment
FROM nginx:1.25.5-alpine

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]