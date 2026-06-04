# Stage 1: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Vite inlines these at build time — pass via --build-arg
ARG VITE_API_BASE_URL
ARG VITE_DOMAIN

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_DOMAIN=$VITE_DOMAIN

RUN pnpm build

# Stage 2: Serve
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Default for local / docker compose; Railway overrides this at runtime
ENV PORT=80

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:${PORT}/ || exit 1

# Substitute $PORT into the nginx config, then start nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
