# build environment
FROM node:20-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY ./ckeditor5 /app/ckeditor5
COPY ./package.json /app/package.json

RUN pnpm install

COPY . /app

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
