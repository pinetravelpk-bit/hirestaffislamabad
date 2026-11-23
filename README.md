# hirestaffislamabad.pk

Website for **Hire Staff Islamabad** — domestic, care and office staffing in Islamabad and Rawalpindi — built on the Hirestaff Next.js theme (v6 design).

## What's in it

- **Staffing pages:** 14 services (`/services/<slug>/`), 28 areas (`/areas/<slug>/`) and 168 service × area pages for core roles (`/services/<slug>/<area>/`), guides, FAQs, how it works, about, contact.
- **Lead capture:** request form (`/request-staff/` and on every service/area page) that sends the enquiry via WhatsApp or email.
- **Job seekers:** job board (`/find-jobs/`, `/vacancies/<id>/`) served from `data/jobs.json`, and the free CV builder (`/cv/`, PDF export in the browser).
- **Employers:** free job posting (`/post-job/`) — the vacancy is sent to the team via WhatsApp/email for review, then added to `data/jobs.json`.
- **Career Studio** (`/studio/`): Offer Lab and career tools from the theme (noindex).

## SEO / AEO / GEO / local SEO

- Unique title, description, canonical, Open Graph/Twitter card per page; generated OG image.
- JSON-LD: `EmploymentAgency` (LocalBusiness) with service areas, `WebSite` + SearchAction, `Service`, `OfferCatalog`, `HowTo`, `FAQPage`, `BreadcrumbList`, `Article`, `JobPosting` (real vacancies only), `WebApplication` (CV maker), `speakable`.
- Answer-first summary paragraph on every page (`.hs-answer`) for answer engines and AI overviews; visible FAQs that match schema; Urdu role names; "last updated" dates.
- `robots.txt` that welcomes search and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), `sitemap.xml`, `llms.txt` and `llms-full.txt`.
- Geo meta tags, NAP in the footer, area-specific local notes.
- Rankings and AI citations are not guaranteed — this is the technical and content foundation. Next steps: Google Business Profile, Search Console, Bing Webmaster Tools, reviews and local citations.

## Business details

Contact details are **not** hard-coded. Set them as GitHub Actions *Variables* (or `.env.local` locally) — see `.env.example`. Only real details should be published; they feed the LocalBusiness schema.

## Develop

```bash
npm ci
npm run dev
```

## Deploy (VPS)

Deployment runs from GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`: build → upload the standalone bundle over SSH → PM2 reload → health check. Nginx proxies the domain to `127.0.0.1:3010`.

1. On the VPS (once, as root): copy the `deploy/` folder and run `bash deploy/setup-vps.sh you@example.com` (installs Node 22, PM2, Nginx, Certbot and issues SSL for the apex and `www`).
2. In GitHub → Settings → Secrets and variables → Actions → **Secrets**: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (private key whose public key is in the server's `authorized_keys`), optionally `VPS_PORT`.
3. Add the business details as **Variables** (`NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, …).
4. Push to `main` or run the workflow manually.

## Adding vacancies

Edit `data/jobs.json` (format in `data/README.md`) and push.
