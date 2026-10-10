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

During migration, Cloudflare builds `cloudflare-migration` so preview testing
does not publish changes to the Vercel production branch. After validation and
cutover, merge the migration and point Cloudflare's production branch to `main`.

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
with static files. Historical statistics remain in Vercel. Cloudflare Web
Analytics can be configured separately.

## Dependency follow-up

Compatible dependency updates were applied during preparation on 2026-10-10.
The build remains on Astro 6. The dependency audit still reports four affected
packages (Astro, MDX, Sharp and esbuild); the suggested complete fix includes
a major Astro upgrade. This needs a separate upgrade and regression review.
Only static output is deployed: no Astro image endpoint, development server,
SSR runtime or server islands are exposed by this deployment.
