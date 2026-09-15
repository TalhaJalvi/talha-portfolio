# TalhaJalvi platform migration

This branch prepares the existing site for a staged move from GitHub Pages to a monorepo deployed on Cloudflare, while preserving the current production site at repository root until DNS is switched.

## Structure

- `apps/web` — Cloudflare-hosted copy of the existing static website. The public files intentionally preserve current URLs, metadata, sitemap files and AdSense markup.
- `apps/api` — Cloudflare Worker + Hono API shared by web and mobile.
- `apps/mobile` — Expo / React Native application foundation.
- `packages/shared-types` — types shared across mobile, web and API.
- `packages/simulation-engine` — deterministic local simulation logic shared by web and mobile.
- `supabase/migrations` — database schema and RLS policies.

The repository-root website is intentionally retained during the migration so the currently live GitHub Pages deployment is not changed by this branch alone.

## Local setup

1. Install Node.js and pnpm.
2. Run `pnpm install` from repository root.
3. Create a Supabase project.
4. Apply `supabase/migrations/001_initial_platform.sql` with the Supabase CLI or SQL editor.
5. Copy `apps/api/.dev.vars.example` to `apps/api/.dev.vars` and populate local Supabase values.
6. Run `pnpm dev:api` for the Worker API.
7. Run `pnpm dev:mobile` for Expo.
8. For the static website, run `pnpm --filter @talhajalvi/web dev`.

## Cloudflare deployment

### Website

From `apps/web`, deploy with `pnpm deploy`. Test the generated `*.workers.dev` deployment before attaching `talhajalvi.com`.

Do not move DNS until the preview is checked for:

- homepage and article URLs
- CSS, JavaScript, images and webfonts
- canonical URLs
- robots.txt and all sitemap files
- Search Console verification HTML
- AdSense script
- privacy/terms pages

When verified, attach `talhajalvi.com` as the custom domain for the web Worker and remove/replace the GitHub Pages DNS records only during the final cutover.

### API

Deploy `apps/api` separately. Recommended production domain: `api.talhajalvi.com`.

Set Worker secrets instead of committing them:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Example: `wrangler secret put SUPABASE_SERVICE_ROLE_KEY`.

The service-role key must never be shipped in the web or mobile client.

## Supabase responsibilities

Supabase owns authentication and PostgreSQL data. The Worker owns application business logic, validation, authorization checks, rate limiting and future subscription/code-execution rules.

Simple authenticated reads can later be performed directly from clients where RLS makes that safe, but privileged writes should continue to pass through the API.

## Simulation architecture

The core simulator should run locally in the browser/mobile app through `@talhajalvi/simulation-engine`. Large virtual traffic numbers represent modeled load, not one real process/request per simulated user.

Future secure code execution should be a separate sandbox service behind the API rather than executing arbitrary student code inside the React Native or Worker process.

## Cutover strategy

1. Merge only when the live branch is ready for the hosting transition.
2. Deploy `apps/web` to a Cloudflare preview/Workers domain.
3. Validate URL parity and SEO/AdSense behavior.
4. Deploy `apps/api` and configure Supabase secrets.
5. Attach `api.talhajalvi.com`.
6. Attach `talhajalvi.com` to the Cloudflare web deployment.
7. Update DNS away from GitHub Pages.
8. Verify HTTPS, redirects, Search Console, sitemap fetching and AdSense.
9. Keep GitHub Pages available until Cloudflare has been verified in production.
10. In a later cleanup PR, remove the duplicate legacy website from repository root once the Cloudflare deployment is stable.

This intentionally separates the hosting migration from future product work such as the system-design lab UI, subscriptions, Durable Objects, R2 and code sandboxes.
