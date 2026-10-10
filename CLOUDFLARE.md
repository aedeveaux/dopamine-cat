# Cloudflare hosting

The site builds to static HTML, CSS, JavaScript, images and a Pagefind search
index in `dist/`. No Worker script, server-side adapter or paid plan is needed.

## Build configuration

- Node: 22.12 or newer, as required by `package.json`.
- Install: `npm ci`.
- Build: `npm run build` (includes Pagefind).
- Deploy: `npm run deploy`.
- Root directory: repository root.
- Worker name: `dopamine-cat`.
- Static assets and routing: `wrangler.jsonc`.

Production branch: `main`. Cloudflare Workers Builds publishes pushes to main.
Migration completed October 10, 2026 after validating a separate migration
branch. Vercel's Git connection is disconnected; its prior deployment remains
available for rollback.

The public Kit form endpoint is supplied by `PUBLIC_KIT_FORM_ACTION` in the
existing tracked `.env.local`. This URL is intentionally public: it is the
HTML form action, not an API credential. Never put secrets in that file.
Newsletter submissions go directly to Kit. Hosting changes do not migrate
subscribers or email delivery.

URLs remain at `https://www.thedopaminecat.com`. Cloudflare serves extensionless
pages without trailing slashes; incoming trailing-slash links redirect to the
same page. Unknown paths return HTTP 404 rather than the home page.

## Migration verification and rollback

Deploy and test the workers.dev URL before changing the custom domain. Check
the homepage, all six articles, newsletter modal/form action, Pagefind search,
images/fonts, RSS and sitemap. Preserve the apex-to-www redirect and all email
DNS records. Keep the existing Vercel deployment until the Cloudflare site is
verified. Record the original web DNS records before switching them; restore
those records to return traffic to Vercel if needed.

Vercel Analytics has been removed because its hosted endpoints do not move
with static files. Historical statistics remain in Vercel. An existing
Cloudflare Web Analytics site is configured for `thedopaminecat.com`, with EU
visitors excluded. Its automatic beacon was not present in the checked live
HTML after migration, so collection needs follow-up before relying on counts.
The existing analytics privacy setting was preserved.

The Cloudflare zone redirect `Canonical HTTPS www` sends apex requests and
HTTP www requests to HTTPS www, preserving paths and queries (301).
Both domains use Worker custom domains. All email and verification DNS
records were preserved.

Validation: 33 page/asset/feed URLs passed on preview and live domains; unknown
paths returned 404; search returned both cookie articles; the newsletter modal
opened and retained the public Kit endpoint. No test subscription was sent.

Repository audit: no Vercel config, serverless functions, middleware, Supabase,
auth callbacks, cron jobs or deployment hooks were found. Astro optimizes
images during the build. The only application environment variable is the
public Kit form URL. No external database or runtime secrets are needed.

## Dependency follow-up

Compatible dependency updates were applied during preparation on 2026-10-10.
The build remains on Astro 6. The dependency audit still reports four affected
packages (Astro, MDX, Sharp and esbuild); the suggested complete fix includes
a major Astro upgrade. This needs a separate upgrade and regression review.
Only static output is deployed: no Astro image endpoint, development server,
SSR runtime or server islands are exposed by this deployment.
