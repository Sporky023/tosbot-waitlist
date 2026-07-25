# TOSbot — Validation / Waitlist Site

Static marketing site for **TOSbot** (Terms of Service → “toss”): early-warning
alerts for social TOS risk. This deploy is **validation-first** — product is not
live; CTAs capture a **private beta waitlist**.

Live: https://sporky023.github.io/tosbot-waitlist/

## Structure

```
site/
├── index.html      # Landing page
├── pricing.html    # Planned pricing + waitlist CTAs
├── privacy.html    # Plain-language privacy placeholder
├── css/style.css
├── js/main.js      # Mobile nav + WAITLIST_FORM_URL wiring
├── assets/favicon.svg
├── README.md
└── LUKE_TODO.md    # Google Form steps + redeploy
```

No build step. No framework. Google Fonts optional.

## Waitlist config (single constant)

In `js/main.js`:

```js
var WAITLIST_FORM_URL = ""; // paste Google Form URL here
```

Also mirror the URL (one line) in:

`../WAITLIST_FORM_URL.txt`

- If URL is set → every `.js-waitlist-cta` opens the Google Form.
- If empty / `PLACEHOLDER` → falls back to
  `mailto:cecilassists@gmail.com?subject=TOSbot%20waitlist` so people can still
  raise a hand until the form exists.

**Do not fake a success state.** There is no UI-only “you're in!” without a real
capture path.

Base config + Luke steps: see `LUKE_TODO.md` and parent `WAITLIST_FORM_URL.txt`.

## Deploy

Prefer the helper from `notes/tosbot/marketing/`:

```bash
cd /home/deploy/.openclaw/workspace/notes/tosbot/marketing
./inject-waitlist-url.sh   # optional: sync .txt → main.js
./deploy-gh-pages.sh
```

Manual: push **contents of this `site/` directory** to repo root of
`Sporky023/tosbot-waitlist` on `main`, with GitHub Pages source = `main` / `/`.

## Notes

- Branding is **TOSbot** (not TossBot).
- Pricing cards state the $4.99/mo figure as a **hypothesis**, not live billing.
- Testimonials are illustrative placeholders until real beta quotes exist.
