# Studio Flamboyant

Studio Flamboyant is an independent, conceptual architecture-portfolio case
created by Fabiano Frank to demonstrate senior frontend craft. It combines
editorial composition, expressive scroll motion, a bilingual route system,
accessibility foundations, technical SEO, licensed media and a production-minded
lead flow in one deliberately small product.

This repository does **not** represent an operating architecture practice. The
studio identity, project names, descriptions and architectural projects shown in
the experience are fictional and unbuilt. The contact form is for digital product
and frontend enquiries to Fabiano, not for architectural commissions.

## What is implemented

- English is canonical at `/`; Brazilian Portuguese lives under `/pt`.
- Three conceptual projects have localized names, slugs, copy and image text.
- Project detail routes are statically generated from one typed content source.
- The homepage uses the responsive SVG Column Grid (`index4`) transition with
  GSAP and ScrollTrigger, without the discarded triangular mask, plus a
  reduced-motion fallback.
- Desktop navigation begins with the wordmark, centered routes and a contact
  pill, then yields to a Menu pill on scroll; mobile starts with Menu. The full
  overlay includes keyboard focus management and exact localized route mapping.
- Project stories keep one 175svh image behind title, copy and metadata, then
  use the restored asymmetric `feature-left`, `feature-right`, `triptych`
  gallery cycle.
- Studio is a one-viewport 50/50 experience on desktop and a full-viewport
  media field with an inset 50svh copy card on mobile. Its image loop can be
  paused and every internal scroll region remains keyboard-operable.
- Metadata includes canonical URLs, `hreflang`, Open Graph, Twitter cards,
  sitemap, robots and truthful `WebSite`, creator `Person`, `CollectionPage`
  and `CreativeWork` structured data. Verified LinkedIn and GitHub profiles are
  attached to the creator rather than to the fictional studio.
- The contact page restores the Montes Claros road-map/card/dock interaction;
  its minimal name/email/message form sends digital-project enquiries through
  a validated, abuse-aware Resend endpoint and does not write leads to an
  application database.
- Vercel Analytics records the non-PII `lead_submitted` conversion event;
  Speed Insights is mounted at the locale root.
- Playwright covers the public route contract, responsive shells, locale
  navigation, retired routes, client-side form validation and reduced motion.
  Axe checks the main surfaces for serious and critical violations.

These are implementation statements. Deployment telemetry still belongs to the
final domain review; reproducible local production-build measurements are listed
below.

## Stack

- Next.js 16 App Router and React 19
- TypeScript
- GSAP, ScrollTrigger and Lenis
- `next/image` with AVIF/WebP negotiation
- Zod, Resend and React Email
- Vercel Analytics and Speed Insights
- ESLint, Playwright and Axe

## Local development

Requirements: Node.js 20.x and npm 10.8.2.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

For the complete local quality pass:

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
npm run test:e2e:production
npm audit --omit=dev
```

The focused accessibility command is `npm run test:a11y`. Playwright starts and
stops the local development server through `playwright.config.ts` unless a server
is already running. `test:e2e:production` builds and exercises an isolated
`next start` server, including direct mutation-endpoint checks with email
delivery disabled.

## Verified production-build baseline

On 18 July 2026, the local `next start` build passed 85 Playwright checks across
desktop, mobile and tablet Chromium. The suite includes ten Axe scans with no
serious or critical violations and direct `/api/leads` responses for origin,
content type, payload size, honeypot, timing, expiry and missing provider config.

Lighthouse 12.8.2 mobile results against that build are the median of three
controlled runs per route, after warming the CLI harness so its first install
does not compete with Chrome for CPU:

| Route | Performance | LCP | TBT | CLS | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 2.20 s | 33 ms | 0 | 100 | 100 | 100 |
| `/projects` | 99 | 2.18 s | 44 ms | 0 | 100 | 100 | 100 |
| `/projects/horizon-pavilion` | 100 | 1.88 s | 30 ms | 0 | 100 | 100 | 100 |
| `/studio` | 100 | 1.81 s | 29 ms | 0 | 100 | 100 | 100 |
| `/contact` | 99 | 1.81 s | 77 ms | 0 | 100 | 100 | 100 |

These are controlled local lab results, not field data. Vercel Speed Insights is
the source of truth after deployment.

Both `npm audit` and `npm audit --omit=dev` report zero vulnerabilities. The
root npm override keeps Next.js 16.2.10 on the patched PostCSS 8.5.19 release;
the production build and all 85 browser/API checks pass with that override.

## Environment variables

Copy `.env.example` to `.env.local` only when testing runtime integrations. Never
commit secrets.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public origin used by metadata, sitemap and contact-request origin validation. |
| `RESEND_API_KEY` | Server-side Resend credential. |
| `CONTACT_TO_EMAIL` | Inbox that receives digital-project enquiries. |
| `CONTACT_FROM_EMAIL` | Verified Resend sender, optionally with a display name. |

The contact endpoint fails closed in production when the canonical origin or
email configuration is incomplete. In Vercel, `NEXT_PUBLIC_SITE_URL` must match
the origin from which the form is submitted; production should use the final
public domain.

## Routes and languages

| English | Português | Purpose |
| --- | --- | --- |
| `/` | `/pt` | Immersive home and featured work |
| `/projects` | `/pt/projetos` | Project index |
| `/projects/horizon-pavilion` | `/pt/projetos/pavilhao-horizonte` | Horizon Pavilion / Pavilhão Horizonte |
| `/projects/mist-house` | `/pt/projetos/casa-neblina` | Mist House / Casa Neblina |
| `/projects/courtyard-house` | `/pt/projetos/casa-patio` | Courtyard House / Casa Pátio |
| `/studio` | `/pt/escritorio` | Studio manifesto and process |
| `/contact` | `/pt/contato` | Digital-project lead form |
| `/privacy` | `/pt/privacidade` | Privacy explanation |

Internal route handlers:

- `POST /api/leads` validates and delivers contact submissions;
- `GET /api/locale-hint` converts Vercel's country header into a boolean language
  suggestion without returning or storing an IP address.

## Content and privacy boundaries

Localized content, routes, project IDs and asset mappings live in
`src/content/site.ts`. Each project is explicitly described as conceptual and
unbuilt; the site does not invent an architect, office address, project location,
area, client, photographer or construction status.

The lead endpoint accepts only the documented form fields, validates payload
size and origin, applies a honeypot and elapsed-time checks, and uses a Resend
idempotency key. Delivery logs contain the submission ID, technical result,
duration and provider status when available; they do not contain the visitor's
name, email or message. The privacy routes explain the contact data, language
preference and technical analytics used by the case.

## Source and reference transparency

The homepage's Column Grid SVG transition is adapted from Hiroki/Codrops'
[SVG Mask Transitions on Scroll](https://github.com/Hiro-kiii/Scroll-Transition/)
demo. Ten architectural WebP images are redistributed from the same repository
at the pinned revision documented in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md). The upstream repository is
MIT-licensed; its complete license notice is preserved in
[`public/licenses/codrops-scroll-transition-MIT.txt`](./public/licenses/codrops-scroll-transition-MIT.txt).

Fourteen additional fictional visualizations were generated specifically for
the three concept studies, so the restored gallery does not borrow photographs
or authorship from a real building. Their prompts, source IDs, dimensions and
hashes are recorded in [`GENERATED_ASSETS.md`](./GENERATED_ASSETS.md). The
artistic wordmark is an original outlined SVG derived from the OFL-licensed
Anybody typeface; Monolog informed the category only and no Monolog asset is
included.

The following websites informed composition and interaction research only:

- [Studio Arthur Casas](https://www.arthurcasas.com/pt/) — dual studio-page
  composition;
- [OH Architecture](https://www.oharchitecture.com.au/) — navigation,
  hierarchy and motion principles;
- [Mana Hotel by Guilherme Torres](https://www.guilhermetorres.com/manahotel) —
  editorial image rhythm in project stories.

No code, copy, branding or media from those three reference sites is included.
Studio Flamboyant is not affiliated with, endorsed by or commissioned by any of
the referenced studios, Hiroki or Codrops. See
[`REFERENCES.md`](./REFERENCES.md) for the design-reference boundaries.

## Asset provenance

Production images live in `public/images/projects/`. They were resized only when
wider than 2400 px, never enlarged, re-encoded as WebP and stripped of
nonessential metadata. The ten upstream assets are audited in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md); generated complements are
audited in [`GENERATED_ASSETS.md`](./GENERATED_ASSETS.md).

The complete MIT notice and third-party attribution must remain with any
redistribution of the adapted demo or its images.

## Publication boundary

Development and verification happen before promotion to the publication branch.
No preview or production destination should reuse a client-branded repository,
deployment project or canonical domain.

Deployment and promotion work that remains is tracked in [`NEXT.md`](./NEXT.md).
