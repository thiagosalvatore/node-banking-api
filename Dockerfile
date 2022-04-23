FROM node:17-slim as base

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

FROM base as production

RUN yarn build






