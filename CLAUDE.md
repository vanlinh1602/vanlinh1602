## Cute Town-Map Portfolio — Agent Guide

A single-page portfolio: a pastel 2D town map drawn in SVG, with clickable districts that zoom the map in and open an HTML panel.

## Coding Rules

Before any code change, read these (all are `alwaysApply: true` for Cursor):

- `.cursor/rules/typescript.mdc` — TypeScript conventions and code quality
- `.cursor/rules/react.mdc` — folder layout, components, styling, content, accessibility
- `.cursor/rules/map.mdc` — SVG town map structure, palette, adding a section

`.cursor/rules/` is the single source of truth for coding rules in this repo. Cursor auto-attaches them via `.mdc` frontmatter; Claude and Codex load them via this file.

## Where Things Live

| Want to change…                         | Edit                                                                                                              |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Name, intro, skills, projects           | `src/content/vi/*.ts` and `src/content/en/*.ts`                                                                   |
| Experience, notes, garden               | `src/content/{vi,en}/{experience,notes,garden}.ts`                                                                |
| GitHub stats (username, cache, limits)  | `src/configs/github.ts`; fetched live in `hooks/gitHubStats.ts`                                                   |
| Email and social links                  | `src/content/contact.ts`                                                                                          |
| Fixed UI text (hint, aria labels)       | `src/content/{vi,en}/copy.ts`                                                                                     |
| Section labels / emoji                  | `src/content/{vi,en}/sections.ts`                                                                                 |
| District positions and zoom per section | `src/configs/mapViews.ts`                                                                                         |
| Map (SVG) colors                        | `src/configs/palette.ts`                                                                                          |
| Page title and share (Open Graph) tags  | `index.html`, `public/og-image.jpg`                                                                               |
| DOM colors                              | CSS variables in `src/index.css`                                                                                  |
| Town backdrop and cat sprite            | `public/images/town/`, paths in `src/configs/artwork.ts`                                                          |
| Animated scenery                        | `src/components/TownMap/Atmosphere.tsx`, `LivingScenery.tsx`                                                      |
| Day/night, seasons, villagers           | `src/configs/ambience.ts`, `VILLAGER_ROUTES` in `configs/livingTown.ts`; preview with `?time=night&season=winter` |
| Guided tour timing                      | `src/configs/tour.ts`, `hooks/tour.ts`                                                                            |
| Building hit regions and facade signs   | `src/configs/mapViews.ts`, `TownMap/District.tsx`                                                                 |
| Panel content for a section             | `src/components/Panel/<Name>Content.tsx`                                                                          |
| Add a new clickable section             | Follow "Adding A New Section" in `.cursor/rules/map.mdc`                                                          |

## Commands

| Command             | Does                                        |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Vite dev server on http://localhost:5173    |
| `npm run build`     | `tsc -b` then `vite build` into `dist/`     |
| `npm run lint`      | ESLint (imports sort, unused, hooks)        |
| `npm run lint:fix`  | ESLint with autofix                         |
| `npm run format`    | Prettier write                              |
| `npm run typecheck` | `tsc -b`                                    |
| `npm run check`     | lint + format check + build — the full gate |

## Quality Gates

Husky enforces gates on git operations — run the equivalents proactively before declaring done, so commits/pushes pass first try.

| Hook       | Hook runs                                                                                                        | Run proactively     |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | ------------------- |
| pre-commit | `npx lint-staged` — `eslint --fix` + prettier on staged `src/**/*.{ts,tsx}`, prettier on staged css/html/json/md | `npm run lint`      |
| pre-push   | `npm run typecheck`                                                                                              | `npm run typecheck` |

Before declaring any change done, run `npm run check`. `tsc -b` and `vite build` do **not** catch import-sort or formatting errors — only ESLint and Prettier do.

For visual changes, also run `npm run dev` and look at the result in a browser at desktop and phone widths: a passing build says nothing about whether the map zoom, panel layout or district labels still look right.

## Deployment

- `.github/workflows/deploy.yml` deploys to GitHub Pages on every push to `main` (and on manual `workflow_dispatch`). It runs lint, format check and build, so a red `npm run check` means a failed deploy.
- The site may be served from a subpath (`/<repo>/`). CI sets `BASE_PATH` from `actions/configure-pages`, and `vite.config.ts` turns it into Vite's `base`. Never hardcode `/` as the site root in code: reference runtime artwork through `src/configs/artwork.ts`, which uses `import.meta.env.BASE_URL`.
- To reproduce the Pages build locally: `BASE_PATH=/<repo> npm run build && npm run preview`.

## README Is The GitHub Profile

This repo is the special profile repo `vanlinh1602/vanlinh1602`, so `README.md` is rendered on https://github.com/vanlinh1602 as the owner's profile. It is **not** project documentation:

- Do not add setup steps, folder trees or tooling notes to `README.md`. Project docs live in `docs/DEVELOPMENT.md`.
- Keep `README.md` GitHub-flavored (HTML that GitHub sanitizes away — `style`, `<script>`, CSS classes — will not render). Keep its colors in the site palette (`#ff6f9f`, `#ff9ec4`, `#9ad7ff`, `#5b4a6b`, `#8b7aa0`).

## Working Agreements

- Code, comments and docs are in English. User-visible text in `src/content/` exists in Vietnamese (`vi/`, the default) and English (`en/`); both locales satisfy `SiteContent`, so add every new string to both. Components read it through `useContent()`.
- The open section lives in `location.hash` (`useHashSection`), so `/#projects` links straight to a district.
- Do not add dependencies (routers, state libraries, UI kits, Tailwind) without a concrete need; the app is intentionally small.
- Do not commit `dist/`, `.env*` or editor files.
