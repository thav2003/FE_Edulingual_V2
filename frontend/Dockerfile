# build environment
FROM node:20-alpine as build

WORKDIR /app

RUN npm install -g pnpm

COPY frontend/package.json /app/package.json

RUN pnpm install

COPY frontend /app

RUN pnpm run dev
