# build environment
FROM node:20-alpine as build

WORKDIR /app

RUN npm install -g pnpm

COPY frontend/ckeditor5 /app/ckeditor5
COPY frontend/package.json /app/package.json

RUN pnpm install

COPY frontend /app

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
