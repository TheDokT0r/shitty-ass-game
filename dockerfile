FROM oven/bun:latest AS build
WORKDIR /app
COPY . .
RUN bun i --frozen-lockfile
RUN bun run build

FROM nginx:alpine AS base
COPY --from=build /app/dist /usr/share/nginx/html