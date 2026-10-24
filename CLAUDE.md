# CLAUDE.md

pnpm + Turborepo monorepo: `apps/landing` (React 19, Vite, Tailwind v4, shadcn/ui, `motion`), `services/gateway` + `services/contact-service` (NestJS), shared `packages/*`.

## Design source of truth

`DESIGN.md` (root) is the design system, extracted from the actual code. Build on it — do not replace the visual identity, and never regenerate it with `/impeccable document` unless explicitly asked.

## Design skills — who owns what

| Concern | Skill |
| --- | --- |
| Layout, hierarchy, typography, color, UX copy, a11y/responsive audits, polish | `impeccable` (`/impeccable <command>`) |
| Motion: easing, durations, transitions, whether to animate at all | `emil-design-eng`, `review-animations`, `improve-animations` |
| Janky / dropped-frame animations | `animation-performance` |
| Mobile feel (touch, 100vh, safe areas, hover on touch) | `mobile-native` |
| Edge-case / worst-case data testing | `break-ui` |
| 3D models from reference images (Three.js) | `img2threejs` |
| Browser checks, screenshots, e2e | `playwright-cli` |

When `impeccable animate` and the Emil skills overlap, Emil's motion rules win.

## Tooling notes

- `playwright-cli` is a root devDependency: run it as `pnpm exec playwright-cli <cmd>` (there is no global install). Prefer it over the Playwright MCP for browser checks.
- On this Windows machine `python3` is the Microsoft Store stub — use `python` wherever a skill (e.g. `img2threejs`) says `python3`.
- Project skills live in `.agents/skills/` and are junctioned into `.claude/skills/`; `skills-lock.json` is the committed source of truth (`npx skills experimental_install` restores them).
