# Stage 1: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY services/contact-service/package.json ./services/contact-service/package.json

# shamefully-hoist flattens node_modules so all bins resolve without
# pnpm's symlink structure breaking on Alpine Linux
ENV CI=true
RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY services/contact-service ./services/contact-service

RUN pnpm --filter=@gsebold/contact-service build

# Stage 2: Production runner
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY services/contact-service/package.json ./services/contact-service/package.json

ENV CI=true
RUN pnpm install --frozen-lockfile --filter=@gsebold/contact-service --prod --ignore-scripts

COPY --from=builder /app/services/contact-service/dist ./services/contact-service/dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "services/contact-service/dist/main"]
