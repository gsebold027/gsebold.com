# 🚀 gsebold.com

> A personal landing page project built from scratch to learn and apply modern web development practices including CI/CD, infrastructure as code, theming, and internationalization.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

---

## Stack

| Area       | Tool                            |
|------------|---------------------------------|
| Frontend   | React 19 + Vite + TypeScript    |
| UI         | shadcn/ui (Tailwind + Radix UI) |
| i18n       | react-i18next (route-based)     |
| Serving    | Nginx (Docker)                  |
| Registry   | GitHub Container Registry       |
| Hosting    | Railway                         |
| CDN + SSL  | Cloudflare                      |
| CI/CD      | GitHub Actions                  |

## Architecture

```
Push to main
  └── release.yml       → creates semver tag (v1.2.3)
        └── deploy.yml  → builds Docker image
                        → pushes to ghcr.io
                        → deploys to Railway

Pull request → main
  └── validate.yml      → typecheck + lint + build (blocks merge if failing)
```

Traffic: `User → Cloudflare (DNS + SSL) → Railway → Nginx container`

## Local development

```bash
pnpm install       # install dependencies
pnpm dev           # start dev server at http://localhost:3000
pnpm typecheck     # run TypeScript checks
pnpm lint          # run ESLint
pnpm build         # production build
```

### Environment variables

| Variable            | Description              |
|---------------------|--------------------------|
| `VITE_API_BASE_URL` | Backend API base URL     |
| `VITE_DOMAIN`       | Public domain (for SEO)  |

Set as repository secrets in GitHub Actions and as variables in Railway.
