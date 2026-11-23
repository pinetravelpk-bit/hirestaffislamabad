# hirestaffislamabad.pk

Website for **Hire Staff Islamabad** — domestic, care and office staffing in Islamabad and Rawalpindi — built on the Hirestaff Next.js theme (v6 design).

## What's in it

The original Hirestaff Next.js theme (v6) — homepage, Studio, job board, free CV builder, company builder and the theme's demo workspace — unchanged in design and content, with:

- Job board API routes (`app/api/`) serving vacancies from `data/jobs.json`, replacing the theme's Cloudflare Worker/D1 backend that cannot run on a VPS.
- Post a job: without the hosted sign-in, “Publish” sends the vacancy to the Hirestaff team by WhatsApp/email for review.
- SEO layer only: canonical URLs, Open Graph image, Organization/WebSite/WebApplication schema, `robots.txt`, `sitemap.xml`, `llms.txt`. The theme's fictional demo pages stay noindex.

## Business details

Contact details are **not** hard-coded. Set them as GitHub Actions *Variables* (or `.env.local` locally) — see `.env.example`. Only real details should be published; they feed the LocalBusiness schema.

## Develop

```bash
npm ci
npm run dev
```

## Deploy (VPS)

**Default: pull-based.** On the VPS, `bash deploy/pull-deploy.sh --install` builds `main`, starts it with PM2 on port 3010 and adds a cron job that redeploys within 5 minutes of every push to `main`. Business details go in `/etc/hirestaffislamabad.env` (same names as `.env.example`); run `bash deploy/pull-deploy.sh --force` after editing it. Log: `/var/log/hirestaffislamabad-deploy.log`.

**Optional: push-based** from GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`: build → upload the standalone bundle over SSH → PM2 reload → health check. Nginx proxies the domain to `127.0.0.1:3010`.

1. On the VPS (once, as root): copy the `deploy/` folder and run `bash deploy/setup-vps.sh you@example.com` (installs Node 22, PM2, Nginx, Certbot and issues SSL for the apex and `www`).
2. In GitHub → Settings → Secrets and variables → Actions → **Secrets**: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (private key whose public key is in the server's `authorized_keys`), optionally `VPS_PORT`.
3. Add the business details as **Variables** (`NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, …).
4. Push to `main` or run the workflow manually.

## Adding vacancies

Edit `data/jobs.json` (format in `data/README.md`) and push.

## Online CV pages

- `/cv/` — 12 CV templates (3 direct-PDF + 9 designer templates with photo, sidebars, timeline, skill bars). Designer templates save as PDF via the browser print window.
- “Create my CV page” publishes the CV at `/p/<username>/` and gives the person a username + generated password.
- `/cv/account/` — sign in, edit, hide/show, share, change password, delete.
- Public pages have share buttons, WhatsApp/Call/Email, a per-CV social preview image and are listed in `sitemap.xml`.
- Accounts are JSON files in `CV_DATA_DIR` (default `/var/lib/hirestaffislamabad/cv`), outside the release folders, so deploys keep them. Back this folder up.
