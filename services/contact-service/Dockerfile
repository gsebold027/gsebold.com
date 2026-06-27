# Stage 1: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json turbo.json ./
COPY services/contact-service/package.json ./services/contact-service/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json

# shamefully-hoist flattens node_modules so all bins resolve without
# pnpm's symlink structure breaking on Alpine Linux
ENV CI=true
RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY services/contact-service ./services/contact-service
COPY packages/schemas ./packages/schemas

RUN pnpm turbo run build --filter=@gsebold/contact-service

# Stage 2: Production runner
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY services/contact-service/package.json ./services/contact-service/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json

ENV CI=true
RUN pnpm install --frozen-lockfile --filter=@gsebold/contact-service --prod --ignore-scripts

COPY --from=builder /app/services/contact-service/dist ./services/contact-service/dist
COPY --from=builder /app/packages/schemas/dist ./packages/schemas/dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "services/contact-service/dist/main"]
