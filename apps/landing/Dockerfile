# Stage 1: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json turbo.json ./
COPY apps/landing/package.json ./apps/landing/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json

ENV CI=true
RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY apps/landing ./apps/landing
COPY packages/schemas ./packages/schemas

# Vite inlines these at build time — pass via --build-arg
ARG VITE_API_BASE_URL
ARG VITE_DOMAIN

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_DOMAIN=$VITE_DOMAIN

RUN pnpm turbo run build --filter=@gsebold/landing

# Stage 2: Serve
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/landing/dist /usr/share/nginx/html
COPY apps/landing/nginx.conf /etc/nginx/templates/default.conf.template

# Default to empty so envsubst always replaces ${NGINX_CONNECT_SRC_EXTRA}
# even when no value is passed at runtime — nginx rejects undefined nginx variables
ENV NGINX_CONNECT_SRC_EXTRA=""

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
