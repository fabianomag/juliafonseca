# Studio Flamboyant

An editorial architecture experience where interaction design and frontend
engineering reinforce the same product.

[Live demo](https://flamboyant-studio.vercel.app) ·
[Português](https://flamboyant-studio.vercel.app/pt) ·
[Agent-readable case study](https://flamboyant-studio.vercel.app/case-study.md)

Studio Flamboyant turns three fictional architecture studies into a
production-ready bilingual website. It is a focused frontend case by
[Fabiano Magalhães](https://www.linkedin.com/in/fabianomag/): visual references
were translated into an original responsive system without giving up
accessibility, crawlability, performance or operational safety.

> The studio and architecture are fictional and unbuilt. The product design,
> frontend implementation and verification are real.

> **Source available for portfolio review. This is not open-source software.**
> Commercial or non-commercial reuse, in whole or in part, requires a separate
> written license. See [LICENSE.md](./LICENSE.md).

Standard commercial terms are available for one final product: R$ 1,000 in
Brazil or USD 1,000 internationally, each as a one-time fee under a signed
agreement. See the [Brazilian](./COMMERCIAL-LICENSE-TEMPLATE.pt-BR.md) and
[international](./COMMERCIAL-LICENSE-TEMPLATE.en.md) public templates.

## Why this project matters

- **Design engineering:** a distinctive editorial direction became a reusable
  layout, navigation and motion system instead of a collection of isolated
  effects.
- **Quality under constraint:** expressive scroll behavior coexists with
  reduced-motion fallbacks, keyboard access, responsive layouts and stable
  image rendering.
- **Production thinking:** the case ships with bilingual canonical routes,
  structured data, licensed assets, automated browser checks, observability and
  a fail-closed contact endpoint.

## Evidence at a glance

| Area | Evidence |
| --- | --- |
| Interaction design | Column-grid home transition, scroll-aware navigation, immersive project stories and a dual-layout studio page |
| Frontend architecture | Next.js App Router, typed localized content, statically generated project routes and focused client islands |
| Accessibility | Keyboard navigation, focus management, semantic landmarks, localized alternative text and `prefers-reduced-motion` behavior |
| Delivery quality | Playwright route/responsive/API coverage, Axe checks, security headers and explicit third-party provenance |
| Discovery | Canonical and `hreflang`, sitemap, robots, truthful JSON-LD and an agent-readable Markdown chain |

## Measured baseline

Controlled mobile Lighthouse runs against the local production build:

| Route | Performance | LCP | TBT | CLS | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 2.20 s | 33 ms | 0 | 100 | 100 | 100 |
| `/projects` | 99 | 2.18 s | 44 ms | 0 | 100 | 100 | 100 |
| `/projects/horizon-pavilion` | 100 | 1.88 s | 30 ms | 0 | 100 | 100 | 100 |
| `/studio` | 100 | 1.81 s | 29 ms | 0 | 100 | 100 | 100 |
| `/contact` | 99 | 1.81 s | 77 ms | 0 | 100 | 100 | 100 |

These are reproducible lab results, not field claims. Vercel Speed Insights is
the source of truth for real-user data after publication.

## Key decisions

### Motion is part of the information architecture

The home adapts the MIT-licensed Column Grid variant from Hiroki/Codrops. The
transition introduces the three studies directly; it is not a decorative intro
before the content. Coarse pointers and reduced-motion users receive simpler
behavior rather than a fragile imitation of the desktop timeline.

### Localization is a route contract

English is canonical at `/`; Brazilian Portuguese lives under `/pt`. Route
pairs, project slugs, metadata and navigation counterparts come from one typed
content source. There is no forced geographic redirect.

### Fiction stays explicit

The site does not invent clients, locations, architects, photographers or built
work. JSON-LD describes the pages as a website and creative frontend case, while
Fabiano Magalhães is identified separately as the creator.

### The contact flow fails closed

`POST /api/leads` validates content type, body size, origin, consent, timing and
a honeypot before sending through Resend with idempotency. It stores no lead
database and excludes submitted personal information from application logs. If
production credentials are missing, delivery remains unavailable instead of
pretending success.

## Agent-readable public surface

The case uses the same compact recovery principle developed in SGOPS:

```text
/llms.txt -> /sitemap.md -> /case-study.md -> canonical HTML routes
```

This does not manufacture architecture authority. It makes the real engineering
evidence easier for retrieval systems to find, interpret and verify.

## Stack

- Next.js 16, React 19 and TypeScript
- GSAP, ScrollTrigger and Lenis
- Zod, Resend and React Email
- Vercel Analytics and Speed Insights
- Playwright, Axe and ESLint

## Run locally

Requirements: Node.js 24.x and npm 10.8.2.

```bash
npm ci
npm run dev
```

Full verification:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run test:e2e:production
npm audit --omit=dev
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public origin and accepted form origin |
| `RESEND_API_KEY` | Server-side Resend credential |
| `CONTACT_TO_EMAIL` | Inbox for digital-product enquiries |
| `CONTACT_FROM_EMAIL` | Verified Resend sender |

## Sources and asset provenance

The Column Grid implementation and ten source images are adapted from
[Hiroki/Codrops' MIT-licensed demo](https://github.com/Hiro-kiii/Scroll-Transition/).
Fourteen additional fictional visualizations were generated for this case. The
wordmark is an original outlined SVG derived from the OFL-licensed Anybody
typeface.

Exact revisions, licenses, mappings and hashes are recorded in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md),
[`GENERATED_ASSETS.md`](./GENERATED_ASSETS.md) and
[`REFERENCES.md`](./REFERENCES.md).

Studio Arthur Casas, OH Architecture and Mana Hotel informed composition and
interaction research only. No code, copy, branding or media from those sites is
included.
