# Studio Flamboyant — frontend case study

## Summary

Studio Flamboyant is a bilingual editorial architecture experience designed and built by Fabiano Magalhães. It demonstrates how strong visual direction can become a maintainable, accessible and measurable frontend system.

Live: https://flamboyant-studio.vercel.app
Source: https://github.com/fabianomag/studio-flamboyant

## Authorship boundary

- Studio Flamboyant is fictional.
- Horizon Pavilion, Mist House and Courtyard House are conceptual and unbuilt.
- Fabiano Magalhães created the product concept, visual identity, interaction design and frontend implementation.
- The case does not claim architectural practice, built work, clients or photography credits that do not exist.

## Product value

The work is intentionally narrower than a complex application. Its seniority signal comes from disciplined execution: turning editorial references into a coherent responsive system, maintaining truthful content and licenses, and preserving accessibility, performance, discovery and operational safeguards alongside expressive motion.

## Engineering evidence

- Next.js 16 App Router, React 19 and TypeScript
- typed English and Brazilian Portuguese route/content contracts
- statically generated project details and focused client-side islands
- GSAP/ScrollTrigger motion with coarse-pointer and reduced-motion fallbacks
- keyboard-accessible navigation, focus handling, landmarks and localized image text
- canonical URLs, hreflang, sitemap, robots and truthful JSON-LD
- Playwright route, responsive, form, API and reduced-motion checks
- Axe checks for serious and critical accessibility violations
- origin, payload, consent, timing, honeypot and idempotency controls on lead delivery
- Vercel Analytics and Speed Insights without submitted personal data in events

## Controlled mobile baseline

| Route | Performance | LCP | TBT | CLS | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 2.20 s | 33 ms | 0 | 100 | 100 | 100 |
| `/projects` | 99 | 2.18 s | 44 ms | 0 | 100 | 100 | 100 |
| `/projects/horizon-pavilion` | 100 | 1.88 s | 30 ms | 0 | 100 | 100 | 100 |
| `/studio` | 100 | 1.81 s | 29 ms | 0 | 100 | 100 | 100 |
| `/contact` | 99 | 1.81 s | 77 ms | 0 | 100 | 100 | 100 |

These Lighthouse measurements are controlled local lab results, not field data.

## Source transparency

The home transition and ten images are adapted from Hiroki/Codrops' MIT-licensed Scroll Transition demo. Fourteen additional fictional visualizations were generated for this case. The wordmark is derived from OFL-licensed Anybody outlines. Exact revisions, prompts, hashes and notices are available in the source repository.

Visual references informed composition only; the case does not redistribute their code, copy, branding or media.

## Licensing

The project's original materials are source-available for portfolio review and are not open source. Commercial or non-commercial reuse requires a separate written license. Third-party materials remain governed by their respective licenses.

Licensing summary: https://flamboyant-studio.vercel.app/licensing.txt

Last reviewed: 19 July 2026.
