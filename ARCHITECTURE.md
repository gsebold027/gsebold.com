# Architecture

How gsebold.com is put together: what each part owns, how a request moves through the system, and the rules that keep it working. For visual design see [DESIGN.md](DESIGN.md); for agent workflow see [AGENTS.md](AGENTS.md).

## System overview

```
                        ┌─────────────── Cloudflare (DNS, TLS, CDN) ───────────────┐
                        │                                                          │
 Browser ── page load ──┼──▶ gsebold.com ──────▶ landing   (nginx, static files)   │
    │                   ├──▶ games.gsebold.com ▶ games     (nginx, static SPA)     │
    │                   │                                                          │
    └── contact form ───┼──▶ api.gsebold.com ──▶ gateway   (Express)               │
                        └──────────────────────────────┬───────────────────────────┘
                                                       │ Railway private network
                                                       ▼
                                                contact-service (NestJS) ──▶ Resend ──▶ inbox
```

- **landing** is a static site. There is no app server in production: nginx serves prebuilt HTML, JS and CSS.
- **games** is a client-only SPA, also served by nginx. It calls no API.
- **gateway** is the only public API. The browser talks to it and nothing else.
- **contact-service** is internal. It has no public domain and no CORS, and only the gateway can reach it.

All four run as separate Railway services, each built from its own Docker image.

## Repository layout

pnpm workspaces + Turborepo. Every workspace is named `@gsebold/<name>`.

| Workspace                        | Kind                                               | Owns                                                                                                     |
| -------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `apps/landing`                   | React 19 + React Router 7 (framework mode, static) | The website: UI, content, i18n, SEO, the CSP                                                             |
| `apps/games`                     | React 19 + Vite SPA (React Router library mode)    | games.gsebold.com: the games hub and each game                                                           |
| `services/gateway`               | Express 4                                          | Public API edge: CORS, security headers, rate limits, proxying to internal services                      |
| `services/contact-service`       | NestJS 11                                          | Validating contact submissions and sending them as email through Resend                                  |
| `packages/schemas`               | TypeScript types + constants                       | The API contract shared by every workspace                                                               |
| `packages/tailwind`              | CSS (source-only)                                  | The visual identity: Tailwind v4 tokens, light/dark variables, fonts, base styles (`src/theme.css`)      |
| `packages/ui`                    | React components (source-only)                     | shadcn/ui + magicui components, typography, `cn`, theme/language switchers, the shared preference cookie |
| `packages/env`, `packages/hooks` | Empty, planned                                     | Shared env loading and React hooks, for the same reason                                                  |

Rule for `packages/*`: code moves there when a **second** consumer needs it, not before. Until then it lives in the app that uses it.

`packages/tailwind` and `packages/ui` have no build step: their `exports` point at source (`.css`, `.tsx`) and each app's Vite compiles them. An app consumes them like this:

- CSS: `@import 'tailwindcss'; @import '@gsebold/tailwind/theme.css'; @source '<relative path>/packages/ui/src';`. The `@source` is required: Tailwind doesn't scan `node_modules`, so without it the classes used only inside `@gsebold/ui` are never generated.
- Components: per-file imports, `@gsebold/ui/components/<name>` and `@gsebold/ui/lib/<name>`. Inside `packages/ui`, imports are relative.
- New shadcn components: run `pnpm dlx shadcn add <name>` in `packages/ui` (it has its own `components.json`), then make the generated imports relative.
- Components take translated strings as props; `@gsebold/ui` depends on neither i18next nor react-router. Each app keeps its own i18n init, locales and routing glue (see `apps/landing/src/components/theme/`).
- Each app's Dockerfile copies the workspace packages it depends on by hand; add new ones there too.

## Request flow: contact form

The site's only dynamic feature, and the template for any future one.

1. **Browser**: `ContactForm` validates with a Zod schema built from `CONTACT_CONSTRAINTS` (`packages/schemas`), then `useContactMe` sends `POST {VITE_API_BASE_URL}/contact/email/contactMe`.
2. **Gateway**, with middleware in this order (see `services/gateway/src/server.ts`):
   1. pino request logging → helmet → CORS (origin allow-list) → compression → global rate limit (100 requests per 15 min per IP)
   2. a route-specific limiter on `POST /contact/email/contactMe` (5 requests per 15 min per IP)
   3. `http-proxy-middleware` strips the `/contact` prefix and forwards to `CONTACT_SERVICE_URL`
   4. body parsing, health routes, error handler, JSON 404
3. **contact-service**: the global `ValidationPipe` (`whitelist` + `forbidNonWhitelisted`) checks `ContactFormDto`, which uses the same `CONTACT_CONSTRAINTS`. `EmailService` HTML-escapes the input and sends it through Resend.
4. The response returns through the gateway unchanged. The form shows a success or warning toast.

**Proxy routes must be registered before body parsing.** The proxy streams the raw request body upstream. If `express.json()` reads the body first, the upstream service receives an empty body.

### Response envelope

Every JSON response from the API, success or error, from either service, has this shape (`packages/schemas/src/api-response.ts`):

```ts
{
  success: (true, message, timestamp, data)
} // ApiSuccessResponse<T>
{
  success: (false, message, timestamp, error)
} // ApiErrorResponse
```

The gateway builds `ApiErrorResponse` for its own failures: 429 rate limit, 503 upstream unavailable or unconfigured, 404, 500. New endpoints must use the same envelope.

### Shared contract (`packages/schemas`)

- `ContactFormFields`, `CONTACT_CONSTRAINTS` and the response types are defined **once** here. The client Zod schema and the server class-validator DTO both read the constraints, so changing a min or max length changes it everywhere.
- The package exports TypeScript source to ESM consumers (Vite, `tsx`) and compiled `dist/` to CommonJS consumers (the Nest build). Turbo's `"dependsOn": ["^build"]` builds it before anything that depends on it.

## Landing app

### Rendering model

`react-router.config.ts` sets `ssr: false, prerender: ['/en', '/pt']`.

| URL           | What nginx serves                                             | What happens                                                                   |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `/en`, `/pt`  | Prerendered HTML with full content and per-language meta tags | Hydrates in the browser                                                        |
| `/`           | SPA fallback (`index.html`), empty body                       | `lang-redirect` sends the visitor to `/en` or `/pt` based on detected language |
| anything else | SPA fallback                                                  | Rendered as the 404 page in the browser                                        |

`src/entry.server.tsx` runs **only at build time**, for prerendering. Code that touches `window`, `localStorage` or `matchMedia` must run in effects or be guarded with `import.meta.env.SSR`. The language is set from the route during prerender because there is no URL for the language detector to read (`routes/lang-layout.tsx`).

### Performance rules

The page is tuned for Lighthouse, so keep these in place:

- **Lazy by default for anything below the fold or optional.** The contact form root (which owns the React Query client and the axios instance), the background grid animation, the toaster, the 404 and error pages, and `motion`'s feature bundle (`LazyMotion`) are all loaded with `lazy()` or dynamic `import()`. Code that only the contact form needs must not be imported by the page shell.
- **No `manualChunks`.** Rollup's import-graph splitting is deliberate (see the comment in `vite.config.ts`). A chunk over 800 kB fails the build.
- Each build writes a bundle report (`rollup-plugin-visualizer`) for the client bundle.

### Content Security Policy

The CSP has two layers, and both apply:

1. **nginx header** (`apps/landing/nginx.conf`): the full policy. `script-src` includes `'unsafe-inline'`.
2. **`<meta>` tag per HTML file**, injected after the build by `scripts/csp-hashes.mjs`. Its `script-src` lists the SHA-256 hash of each inline script (React Router hydration data, the theme script in `root.tsx`).

The browser enforces both policies, so only inline scripts with matching hashes run. Changes to an inline script are picked up automatically on the next build. A **new external origin** (an analytics script, a font CDN, another API host) must be added to the nginx header **and** to `EXTERNAL_SCRIPT_SOURCES` / `connect-src` as relevant. `NGINX_CONNECT_SRC_EXTRA` is filled in when the container starts (nginx template + `envsubst`). Local Docker Compose uses it to allow `http://localhost:3000`.

### Theme

An inline script in `root.tsx` applies the saved theme class before first paint, so the prerendered page doesn't flash the wrong theme. `ThemeProvider` (`@gsebold/ui`) takes over after hydration. The two must agree on the storage key (`PREFERENCE_KEYS.theme`), the lookup order (cookie, then `localStorage`) and the default (`dark`).

### Shared preferences

Theme and language are stored in cookies on the parent domain (`Domain=gsebold.com`, `SameSite=Lax`, one year), so a choice made on one `*.gsebold.com` app applies to the others. `packages/ui/src/lib/preferences.ts` owns the keys and the domain logic. `localStorage` is written too, as a per-origin fallback: localhost and IPs get a host-only cookie, and public-suffix preview hosts reject the parent-domain cookie.

### i18n

- `i18next` with resources bundled at build time from `src/lib/i18n/locales/{en,pt}/*.json`. Each file is a namespace: `common`, `forms`, `landing-page`, `not-found-page`, `work-experience`.
- The language comes from the first path segment, then the shared cookie, then `localStorage`, then the browser. The detector writes the choice back to the cookie and `localStorage`. `SUPPORTED_LANGS` in `src/config/languages.ts` is the source of truth.
- `usePageTranslation(ns)` always adds `common`.
- Structured content (for example career entries in `work-experience.data.ts`) holds translation **keys**. The text itself lives in the locale JSON.

### Build-time configuration

`VITE_API_BASE_URL` and `VITE_DOMAIN` are **inlined into the bundle at build time**. Changing them requires a rebuild, not a restart. They are Docker build args in CI and Compose. `requireEnv` throws if either is missing, so a misconfigured build fails instead of shipping a broken site. Local values go in `src/environments/.env` (see `env.example`).

### SEO files

`public/sitemap.xml`, `robots.txt` and `llms.txt` are maintained **by hand**. When career, skills or page content changes, update `llms.txt` to match. When routes or languages change, update the sitemap and the `hrefLang` links in `routes/landing.tsx`.

## Games app

- **Plain Vite SPA**, no prerender or SSR: a game is client state only. `src/router.tsx` lazy-loads each page. `/` redirects by the language detector (path, shared cookie, `localStorage`, browser), then `/:lang` is the hub and `/:lang/<game>` a game.
- **CSP is a plain header** (`apps/games/nginx.conf`): `script-src 'self'`, no `'unsafe-inline'`, no hashes. Vite emits only external scripts, and the pre-paint theme script is the static file `public/theme-init.js`, not inline. Keep it that way: an inline script would be blocked.
- `public/theme-init.js` mirrors `ThemeProvider` like landing's inline script does: same key (`PREFERENCE_KEYS.theme`), same lookup order, same default (`dark`).
- **i18n** follows landing (same detection config, en/pt, path-prefixed URLs), with its own namespaces: `common`, `hub`, `not-found`. Pages set `document.title` with `useDocumentTitle`; `index.html` holds the static title and Open Graph tags.
- No build-time env: nothing is inlined from `VITE_*`.

## Gateway

- **CORS**: `CORS_ORIGIN` is a comma-separated allow-list. Any `gsebold.com` origin automatically gets its `api.gsebold.com` counterpart added. With no `CORS_ORIGIN`, all origins are allowed only when `NODE_ENV=development`.
- **`trust proxy` is `1`**: the gateway sits behind exactly one proxy (Railway's edge), so `req.ip`, which the rate limits use, is the real client IP.
- **Health routes**: `/health` (liveness), `/ready` (checks every configured upstream's `/health`, returns 503 if one is down), `/status` (process info).
- **Unconfigured upstream**: if `CONTACT_SERVICE_URL` is unset, `/contact/*` returns 503 instead of crashing, so the gateway can run alone.

## contact-service

- **Env is validated at startup** (`src/config/environment.config.ts`). A missing or invalid variable stops the service from starting, rather than failing the first email.
- **Input is untrusted twice over**: once by the DTO (shape and length), and again when it is put into the email body (`escapeHtml`). Any new template must escape user input the same way.
- Swagger UI is served at `/swagger` and is reachable only from inside the private network.
- No CORS, on purpose. If you find yourself adding it, the browser is calling the service directly, and that breaks the topology above.

## Build, release and deploy

Each deployable unit (`landing`, `games`, `gateway`, `contact-service`) has the same three workflows in `.github/workflows/`:

| Workflow              | Trigger                                                            | Does                                                                                                                          |
| --------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `<unit>-validate.yml` | PR to `main` touching that unit (or `packages/**`, root manifests) | Typecheck → lint → test → build, filtered to the unit (typecheck and lint also cover the packages it depends on)              |
| `<unit>-release.yml`  | Push to `main` with the same path filter                           | Bumps the patch version and pushes the tag `<unit>-vX.Y.Z`                                                                    |
| `<unit>-deploy.yml`   | That tag                                                           | Builds the Docker image → pushes it to GHCR (`ghcr.io/<repo>`, `/games`, `/gateway`, `/contact-service`) → `railway redeploy` |

- The release tag is pushed with `GH_PAT`, not `GITHUB_TOKEN`, because tags pushed with `GITHUB_TOKEN` don't trigger other workflows.
- A change under `packages/**` releases **every** unit.
- Docker images use the same two stages for every unit: install the full workspace with `--shamefully-hoist` and run `turbo build --filter`, then install `--prod` for that one workspace and copy only `dist/`. The build context is always the repo root.
- Repository secrets: `VITE_API_BASE_URL`, `VITE_DOMAIN`, `GH_PAT`, `RAILWAY_TOKEN`, and one Railway service ID per unit (`RAILWAY_SERVICE_ID`, `GAMES_RAILWAY_SERVICE_ID`, `GATEWAY_RAILWAY_SERVICE_ID`, `CONTACT_SERVICE_RAILWAY_SERVICE_ID`).

## Local development

- **Full stack in containers:** `docker compose --profile apps up --build`. This starts landing on `:8080`, games on `:8081`, the gateway on `:3000` and contact-service on `:3001`, already wired together. Leave out `--profile apps` to run only the backend.
- **Per workspace:** `pnpm --filter @gsebold/<name> <script>`. Dev servers: landing `:3000`, games `:3002`. Each service reads its own `.env` (copy `.env.example`).
- **Root scripts** (`build`, `lint`, `typecheck`, `test:run`) run through Turbo across all workspaces.
- **Commits**: Conventional Commits, enforced by commitlint. The pre-commit hook runs `pnpm typecheck` for the whole repo.

## Extending the system

**A new backend service** follows the contact-service pattern:

1. `services/<name>` with a `/health` endpoint, env validated at startup, the response envelope from `packages/schemas`, and no CORS.
2. A Dockerfile copied from an existing service (repo-root context, two stages).
3. The three workflows, a Railway service, and its `<NAME>_RAILWAY_SERVICE_ID` secret.
4. In the gateway: a proxy block in `routes/proxy.ts` (prefix rewrite, error → 503 envelope, a route-specific limiter where abuse is possible) and a dependency check in `/ready`.
5. An entry in `docker-compose.yml`.
6. Request and response types in `packages/schemas`.

**A new frontend**: build it on `@gsebold/tailwind` and `@gsebold/ui` (see [Repository layout](#repository-layout) for the CSS and import setup). Wire the theme and language switchers to the shared preference cookie so the choice carries across subdomains.

**A new language**: add it to `SUPPORTED_LANGS`, add a locale folder with every namespace, register it in `translations.ts`, add it to `prerender` in `react-router.config.ts`, and update the sitemap and `hrefLang` links.
