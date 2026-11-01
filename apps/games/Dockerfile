# Stage 1: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json turbo.json ./
COPY apps/games/package.json ./apps/games/package.json
COPY packages/tailwind/package.json ./packages/tailwind/package.json
COPY packages/ui/package.json ./packages/ui/package.json

ENV CI=true
RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY apps/games ./apps/games
COPY packages/tailwind ./packages/tailwind
COPY packages/ui ./packages/ui

RUN pnpm turbo run build --filter=@gsebold/games

# Stage 2: Serve
FROM nginx:alpine AS runner

# Vite writes the SPA (index.html + hashed assets + public/) to dist
COPY --from=builder /app/apps/games/dist /usr/share/nginx/html
COPY apps/games/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
