# Performance Root Cause Analysis

Input PageSpeed summary: Performance `59`, LCP `8.6s`, FCP `3.1s`, TBT `310ms`, CLS `0`.

Analysis basis: current local production output in `.next`, homepage `/`, plus the current source structure. No application code was modified.

## Summary

The current bottleneck is not layout shift and not a missing hero image preload. CLS is `0`, and the hero content is present in the prerendered HTML.

The likely root cause of the poor LCP/FCP score is a heavy initial document and render path:

- Large prerendered homepage HTML: `345.3 KB` raw, about `39.4 KB` gzip.
- Large initial CSS: `149.6 KB` raw, about `22.6 KB` gzip.
- Large homepage first-load JS route bundle: `707.8 KB` raw, about `214.0 KB` gzip.
- Total JS referenced by the generated homepage HTML: `820.4 KB` raw, about `253.7 KB` gzip.
- GTM is preloaded and can pull GA/Ads work early.
- The entire homepage is rendered in one route instead of splitting below-the-fold sections more aggressively.

The LCP is slow even though TBT is only moderate because the browser still has to receive, parse, style, and render a large initial page before the above-the-fold content becomes visually complete on throttled mobile.

## 1. Initial HTML Size

File: `.next/server/app/index.html`

| Size type | Size |
| --- | ---: |
| Raw HTML | `345,300 bytes` / `337.2 KiB` |
| Gzip estimate | `39,388 bytes` / `38.5 KiB` |

This is high for a static landing page. The HTML includes the full page markup plus a large inline React Server Components payload:

- `51` occurrences of `self.__next_f`
- inline RSC/Flight data begins after the full main content
- `.next/server/app/index.rsc` is `125.5 KB` raw

Root cause: the entire landing page content and client reference graph are being emitted up front.

## 2. Initial CSS Size

CSS referenced by the homepage HTML:

| CSS file | Raw | Gzip estimate |
| --- | ---: | ---: |
| `/_next/static/chunks/0u23c2umoe21x.css` | `146.3 KB` | `21.7 KB` |
| `/_next/static/chunks/15h4liwet07u0.css` | `3.4 KB` | `0.9 KB` |
| Total | `149.6 KB` | `22.6 KB` |

Both CSS files are render-blocking because they are normal stylesheet links in the document head.

## 3. Initial JS Size

Homepage first-load route JS from `.next/diagnostics/route-bundle-stats.json`:

| Size type | Size |
| --- | ---: |
| Route first-load JS raw | `707,772 bytes` / `691.2 KiB` |
| Route first-load JS gzip estimate | `214,029 bytes` / `209.0 KiB` |

All JS referenced in the generated homepage HTML:

| Size type | Size |
| --- | ---: |
| HTML-referenced JS raw | `820,366 bytes` / `801.1 KiB` |
| HTML-referenced JS gzip estimate | `253,656 bytes` / `247.7 KiB` |

The HTML-referenced number is larger because it includes every static JS reference present in `index.html`, including the no-module/polyfill script.

## 4. Route Bundle Size

Route: `/`

| Route metric | Value |
| --- | ---: |
| First-load uncompressed JS | `707.8 KB` |
| First-load gzip estimate | `214.0 KB` |
| Number of first-load JS chunks | `12` |

This is large for a mostly static marketing homepage. The route still includes client-side code for Header, Hero search, MotionProvider, WhatsApp tracking, Portfolio, Testimonials, analytics wrappers, and shared Next/React runtime.

## 5. Largest CSS Files

| Rank | File | Raw | Gzip estimate | Notes |
| ---: | --- | ---: | ---: | --- |
| 1 | `0u23c2umoe21x.css` | `146.3 KB` | `21.7 KB` | Main app/Tailwind CSS, render-blocking |
| 2 | `15h4liwet07u0.css` | `3.4 KB` | `0.9 KB` | Additional route/global CSS, render-blocking |

## 6. Largest JS Chunks

Homepage first-load chunks:

| Rank | Chunk | Raw | Gzip estimate |
| ---: | --- | ---: | ---: |
| 1 | `1208sgaz~lt.8.js` | `226.4 KB` | `70.7 KB` |
| 2 | `0640impeh2zmy.js` | `150.3 KB` | `40.4 KB` |
| 3 | `14jwn_t9fa~u~.js` | `62.0 KB` | `22.4 KB` |
| 4 | `0d3shmwh5_nmn.js` | `54.6 KB` | `12.9 KB` |
| 5 | `0lxh~8u-.pog4.js` | `53.0 KB` | `18.6 KB` |
| 6 | `0pqt~8bl3ukh4.js` | `44.4 KB` | `9.2 KB` |
| 7 | `120rejjm05.vt.js` | `33.6 KB` | `11.2 KB` |
| 8 | `14tr~84s4_bwj.js` | `31.9 KB` | `10.1 KB` |
| 9 | `0jlb3f-vunwdi.js` | `24.9 KB` | `7.8 KB` |
| 10 | `turbopack-04zw9yjoozvi1.js` | `10.6 KB` | `4.1 KB` |

Known source contributors:

- `components/sections/hero.tsx` is still a client component for search state.
- `components/sections/header.tsx` is still a client component for mobile/menu behavior.
- `components/ui/motion-provider.tsx`, `components/ui/motion.tsx`, `components/sections/portfolio.tsx`, and `components/sections/testimonials.tsx` still import `framer-motion`.
- `components/sections/testimonials.tsx` uses `AnimatePresence`.
- `components/ui/whatsapp-button.tsx` is client-side and references `window.gtag`.
- `app/layout.tsx` includes GTM, Vercel Analytics, and Speed Insights.

## 7. Render-Blocking CSS

The generated HTML includes:

```html
<link rel="stylesheet" href="/_next/static/chunks/15h4liwet07u0.css" data-precedence="next"/>
<link rel="stylesheet" href="/_next/static/chunks/0u23c2umoe21x.css" data-precedence="next"/>
```

These stylesheets block first render. The main issue is the `146.3 KB` CSS chunk.

## 8. Render-Blocking JS

First-party Next scripts are emitted as `async`, so they are not classic parser-blocking scripts.

However, many async scripts are discovered in the head before the Hero H1 appears in the HTML. They can still compete for bandwidth and CPU during the initial render window.

The generated HTML also preloads GTM:

```html
<link rel="preload" href="https://www.googletagmanager.com/gtm.js?id=GTM-PZB7TBNL" as="script"/>
```

That is not parser-blocking, but it gives GTM early priority and can compete with render-critical resources.

## 9. Third-Party Cost

Configured in `app/layout.tsx`:

- `GoogleTagManager` with `GTM-PZB7TBNL`
- `@vercel/analytics/react`
- `@vercel/speed-insights/next`

The current source does not hardcode GA4 or Google Ads directly, so GA/Ads are likely injected through the GTM container.

Expected cost profile:

- GTM loads early because it is preloaded.
- GTM can load GA4 and Google Ads scripts.
- Ads/analytics do not explain CLS, but they can increase CPU work and network contention before LCP.
- The WhatsApp button also references `window.gtag`, tying conversion tracking to the client bundle.

## 10. Font Loading

Configured in `app/layout.tsx` with `next/font/google`:

- `Montserrat`
- `Playfair_Display`
- both use `display: "swap"`

Homepage font preloads:

| Font file | Raw size |
| --- | ---: |
| `2a65768255d6b625...woff2` | `38.5 KB` |
| `e8f2fbee2754df70...woff2` | `35.5 KB` |
| Total preloaded fonts | `74.0 KB` |

Font setup is mostly correct because `next/font` self-hosts fonts and `display: swap` is enabled. Font size still contributes to early bandwidth, but it is not the primary root cause.

## 11. Whether Next.js Streaming Is Working

The homepage is prerendered:

- `.next/server/app/index.html` exists
- `.next/server/app/index.rsc` exists
- `.next/server/app/index.segments/*` exists

This means App Router server rendering is working. The HTML contains the Hero H1 directly, before hydration is required.

Streaming is not the main issue here. For this static page, the bigger issue is that the full HTML and RSC payload are large, not that streaming is missing.

## 12. Whether App Router Server Rendering Is Optimal

Partially, but not optimal.

Good:

- The homepage is prerendered.
- The Hero H1 and content are in server HTML.
- Many non-interactive sections appear to be Server Components.

Not optimal:

- `MotionProvider` wraps the full app in `app/layout.tsx`.
- `Header` and `Hero` are client components above the fold.
- Below-the-fold client sections like `Portfolio` and `Testimonials` are still part of the homepage route.
- Framer Motion remains in the client graph through below-the-fold sections and shared motion utilities.
- The route still ships `707.8 KB` first-load JS raw.

## 13. Whether React Hydration Delays FCP/LCP

Hydration is probably not the only reason FCP/LCP are slow, because:

- The Hero H1 is present in the initial HTML.
- First-party scripts are async.
- TBT is moderate at `310ms`, not catastrophic.

But hydration still contributes indirectly:

- The route has a broad client graph.
- Above-the-fold `Header` and `Hero` hydrate.
- Client references and inline RSC payload increase HTML size.
- Below-the-fold interactive sections are included in the route bundle.

Conclusion: hydration likely contributes to LCP/FCP through bundle size, parsing, and CPU contention, but the biggest first-paint blocker is the heavy initial render path: large HTML, render-blocking CSS, large JS discovery, and early third-party loading.

## Top 10 Opportunities Ranked By Expected Improvement

| Rank | Recommendation | Expected LCP improvement | Expected FCP improvement | Risk |
| ---: | --- | ---: | ---: | --- |
| 1 | Reduce initial HTML/RSC payload by dynamically importing below-the-fold sections such as `Portfolio`, `Clients`, `Testimonials`, `CTA`, and possibly `Footer` where safe. | `0.8s-1.8s` | `0.4s-1.0s` | Medium |
| 2 | Remove the full-app `MotionProvider` boundary from `app/layout.tsx` and scope Framer Motion only to components that truly need it. | `0.5s-1.2s` | `0.2s-0.6s` | Medium |
| 3 | Split `Hero` so static Hero markup is a Server Component and only the search form is a small Client Component. | `0.4s-1.0s` | `0.2s-0.5s` | Medium |
| 4 | Split `Header` so logo/static nav render as Server Components and only mobile menu state hydrates. | `0.3s-0.8s` | `0.1s-0.4s` | Medium |
| 5 | Reduce the main CSS chunk by removing unused shadcn/ui component CSS paths and unused component imports where possible. | `0.4s-1.0s` | `0.4s-1.0s` | Medium |
| 6 | Delay GTM until after first paint/LCP, or load only essential tags before interaction. | `0.3s-0.9s` | `0.1s-0.4s` | Medium |
| 7 | Remove unused heavy dependencies from the client graph, especially unused Radix/shadcn components, `recharts`, `react-day-picker`, `cmdk`, and other UI packages not used on the homepage. | `0.3s-0.8s` | `0.1s-0.3s` | Low |
| 8 | Keep Framer Motion out of initial homepage JS by lazy-loading animated below-the-fold sections and avoiding shared motion imports above the fold. | `0.3s-0.8s` | `0.1s-0.3s` | Medium |
| 9 | Review font weights/subsets and reduce preloaded font bytes if unused weights are emitted. | `0.1s-0.4s` | `0.1s-0.3s` | Low |
| 10 | Ensure production HTML is compressed on the deployment edge. If PageSpeed still reports uncompressed document bytes, fix compression/CDN headers. | `0.3s-1.0s` | `0.2s-0.8s` | Low |

## Top 3 changes worth implementing.

1. Dynamically import below-the-fold homepage sections so the initial route does not ship the entire landing page payload.
2. Remove the full-app `MotionProvider` boundary and scope Framer Motion only to below-the-fold animated sections.
3. Split `Hero` and `Header` into Server Components with small client islands for search and mobile menu behavior.
