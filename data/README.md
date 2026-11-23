# Vacancies (`jobs.json`)

The public job board (`/find-jobs/`, `/vacancies/<id>/`) is served from `jobs.json`.
Add genuine vacancies only. Each entry:

```json
{
  "id": "maid-f11-2026-12",
  "publishedAt": "2026-12-01",
  "job": {
    "title": "Live-in Maid",
    "companyName": "Private household",
    "sector": "Domestic",
    "city": "Islamabad",
    "area": "F-11",
    "type": "Full-time",
    "mode": "On-site",
    "salaryMin": "35000",
    "salaryMax": "45000",
    "currency": "PKR",
    "payPeriod": "month",
    "vacancies": "1",
    "experience": "2 years in a family home",
    "description": "At least 80 characters describing duties, hours, day off…",
    "requirements": "At least 20 characters…",
    "benefits": "Private room, meals, Sunday off",
    "applyMethod": "email",
    "applyUrl": "",
    "applyEmail": "jobs@hirestaffislamabad.pk",
    "deadline": "2026-12-31"
  }
}
```

Jobs disappear from the board automatically after their `deadline` (Pakistan time).
Commit and push — the site redeploys and the sitemap updates.
