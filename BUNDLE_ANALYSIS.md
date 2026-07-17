# Bundle Analysis

Date: 2026-07-18  
Scope: read-only investigation of the current production build after the recent motion/client-boundary optimizations.  
Application files were not modified.

## Commands Run

- `npm.cmd run build`
  - First sandbox attempt failed with `EPERM: operation not permitted, stat 'C:\Users\shree\OneDrive\Desktop'`.
  - Re-run outside the sandbox passed.
- `npx.cmd next experimental-analyze`
  - First sandbox attempt failed with the same `EPERM`.
  - Re-run outside the sandbox timed out. The analyzer worker PIDs created by that timed-out run were stopped.
- Production diagnostics used:
  - `.next/diagnostics/route-bundle-stats.json`
  - `.next/server/app/page_client-reference-manifest.js`
  - `.next/server/app/index.html`

## Executive Summary

The performance drop is most likely not because TBT got worse. It is because the current build still uses Framer Motion on above-the-fold hero/header elements, and the generated HTML ships important above-the-fold content with inline hidden/translated initial styles such as:

```html
style="opacity:0;transform:translateY(20px)"
```

That means the hero content can be present in the HTML but not visually painted as final content until hydration and animation run. This can improve TBT by removing repeated animations/counters, while making LCP and Speed Index worse because Lighthouse waits longer for the largest visible hero element to appear.

The homepage also still has a large first-load JavaScript budget: `708,232` uncompressed bytes according to Next's route bundle stats.

## 1. Homepage JavaScript Bundles

Next reports the following first-load chunk paths for `/`:

| Chunk | Size on disk | Notes |
|---|---:|---|
| `.next/static/chunks/1208sgaz~lt.8.js` | 226,355 B | shared framework/runtime |
| `.next/static/chunks/0640impeh2zmy.js` | 150,333 B | shared framework/runtime |
| `.next/static/chunks/0ivdgs1oa~bq6.js` | 62,206 B | includes Vercel analytics, Speed Insights, Next third-parties/GTM helper, Framer signatures |
| `.next/static/chunks/0poqtc093ac4s.js` | 59,717 B | Framer signatures |
| `.next/static/chunks/0d3shmwh5_nmn.js` | 54,646 B | shared app/runtime |
| `.next/static/chunks/0pqt~8bl3ukh4.js` | 44,414 B | root main file |
| `.next/static/chunks/0alhsbau0bp0u.js` | 38,036 B | Framer and Lucide signatures |
| `.next/static/chunks/0nge56c~kjxum.js` | 27,910 B | homepage route chunk; Framer signatures |
| `.next/static/chunks/0jlb3f-vunwdi.js` | 24,944 B | preloaded low-priority script |
| `.next/static/chunks/turbopack-04zw9yjoozvi1.js` | 10,580 B | Turbopack runtime |
| `.next/static/chunks/16ty2921ivfs3.js` | 9,091 B | app/layout/page bootstrap |

Next diagnostic value:

```text
/ firstLoadUncompressedJsBytes: 708,232
```

## 2. Initial Render Bundles

The generated homepage HTML includes these script tags during initial render:

```text
/_next/static/chunks/0pqt~8bl3ukh4.js
/_next/static/chunks/1208sgaz~lt.8.js
/_next/static/chunks/0640impeh2zmy.js
/_next/static/chunks/turbopack-04zw9yjoozvi1.js
/_next/static/chunks/16ty2921ivfs3.js
/_next/static/chunks/0alhsbau0bp0u.js
/_next/static/chunks/0d3shmwh5_nmn.js
/_next/static/chunks/0ivdgs1oa~bq6.js
/_next/static/chunks/0poqtc093ac4s.js
/_next/static/chunks/0nge56c~kjxum.js
```

It also preloads:

```text
/_next/static/chunks/0jlb3f-vunwdi.js
https://www.googletagmanager.com/gtm.js?id=GTM-PZB7TBNL
```

The main hero image is correctly preloaded with `fetchPriority="high"`:

```text
/_next/image?url=%2Fimages%2Fherologo%2Fheromainlogo.png...
imageSizes="(max-width: 768px) 100vw, 50vw"
fetchPriority="high"
```

## 3. Largest Libraries / Byte Contributors

Exact per-package byte attribution is limited because the emitted production chunks do not include source maps. Based on route diagnostics, client-reference manifest, and chunk signatures:

1. Next/React framework/runtime is the largest contributor.
   - Largest shared chunks: `226 KB`, `150 KB`, `54 KB`, `44 KB`, `24 KB`, `10 KB`.

2. Framer Motion is still a major contributor.
   - Framer signatures appear in `0alhsbau0bp0u.js`, `0ivdgs1oa~bq6.js`, `0poqtc093ac4s.js`, and `0nge56c~kjxum.js`.
   - It remains in the initial homepage path, not just below the fold.

3. Third-party helper code is in the initial layout graph.
   - `@vercel/analytics`
   - `@vercel/speed-insights`
   - `@next/third-parties`
   - GTM helper code

4. Lucide icons contribute across client and server-rendered output.
   - Lucide signatures appear in at least one initial chunk.
   - Many SVGs are also serialized into the HTML/RSC payload.

5. React Icons still contributes through `components/ui/whatsapp-button.tsx`.
   - The source imports `FaWhatsapp` from `react-icons/fa`.
   - It is globally rendered from `app/layout.tsx`, so it is part of the persistent layout cost.

## 4. Is Framer Motion Still In The Initial Homepage Bundle?

Yes.

The `/` client-reference manifest includes these Framer-dependent project modules:

```text
components/sections/header.tsx
components/sections/hero.tsx
components/sections/portfolio.tsx
components/sections/testimonials.tsx
components/ui/motion-provider.tsx
components/ui/motion.tsx
```

And chunk scanning found Framer/Motion signatures in initial homepage chunks:

```text
0alhsbau0bp0u.js
0ivdgs1oa~bq6.js
0poqtc093ac4s.js
0nge56c~kjxum.js
```

## 5. Are Dynamic Imports Working Correctly?

There are no dynamic imports in the app right now.

Search found no usage of:

```text
next/dynamic
dynamic(
React.lazy(
```

So the issue is not that dynamic imports are failing. They are simply not being used for homepage sections or client islands.

The homepage statically imports every section from `app/page.tsx`, and the client-reference manifest shows the interactive homepage components are still part of the `/` client graph.

## 6. Did Any Server Component Accidentally Become Client?

No full static section appears to have accidentally regained `"use client"`.

Current homepage section client components:

```text
components/sections/header.tsx
components/sections/hero.tsx
components/sections/portfolio.tsx
components/sections/testimonials.tsx
```

These are client components because they contain state/effects/browser interaction.

The formerly static sections such as Services, Stats, About, WhyChooseUs, Process, Clients, CTA, and Footer are still server components, but several of them render `MotionDiv` from `components/ui/motion.tsx`. That does not make the whole section file a client component, but it does create client Framer boundaries inside those sections and keeps Framer in the route.

## 7. Component Most Likely Contributing To LCP

The LCP contributor is almost certainly the Hero section.

Two likely candidates:

1. `components/sections/hero.tsx` main hero image:
   - Source: `public/images/herologo/heromainlogo.png`
   - Source file size: `1,475,422` bytes
   - Rendered via `next/image`
   - Correctly uses `priority`, `fetchPriority="high"`, `fill`, and responsive `sizes`.

2. `components/sections/hero.tsx` headline/content block:
   - The generated HTML renders the left hero content with:
     ```html
     style="opacity:0;transform:translateY(20px)"
     ```
   - If Lighthouse selects the headline/text block as LCP, the Framer initial state delays its visual paint.

The image column is also inside a Framer wrapper with an initial hidden/translated state, so if the main hero image is the LCP element, it can also be visually delayed by hydration/animation even though the image is preloaded.

## 8. Third-Party Script / Main Thread Impact

Source-level analytics setup:

```text
app/layout.tsx
- GoogleTagManager gtmId="GTM-PZB7TBNL"
- Vercel Analytics
- Vercel Speed Insights
```

The generated HTML preloads:

```text
https://www.googletagmanager.com/gtm.js?id=GTM-PZB7TBNL
```

The local bundle includes helper code for:

```text
@next/third-parties
@vercel/analytics
@vercel/speed-insights
```

No direct Google Ads or direct GA4 script is visible in source, but Google Ads/GA4 may still be injected by the GTM container. If Lighthouse reports Google Ads or tag-manager execution as a large main-thread cost, that cost is likely coming from the GTM container configuration, not from direct application source files.

Conclusion: third-party scripts can dominate main-thread time in real Lighthouse runs, especially on mobile throttling, but the available build output cannot see inside the live GTM container. A production trace is needed to attribute exact GTM/Ads execution cost.

## 9. Why TBT Improved But LCP And Speed Index Got Worse

Likely explanation:

1. TBT improved because recent changes removed CPU work:
   - `AnimatedCounter` was removed.
   - Per-card/per-badge animations were removed.
   - Infinite decorative animations were removed.
   - Portfolio layout animations were removed.

2. LCP worsened because above-the-fold content is still hidden by Framer initial states:
   - Header server HTML starts with `transform:translateY(-100px)`.
   - Hero left content starts with `opacity:0; transform:translateY(20px)`.
   - Hero image column also has Framer initial state.
   - These elements only become visually final after client JS hydrates and Framer runs.

3. Speed Index worsened for the same visual reason:
   - Less CPU work does not automatically mean earlier visual completeness.
   - If important first-viewport content is hidden until hydration, the page can look blank/incomplete longer even while doing less total blocking work.

4. The hero image itself is correctly prioritized, so the regression is more likely from render visibility/hydration timing than from missing `priority` or `fetchPriority`.

## 10. Highest-Impact Next Optimization

Highest-impact next step:

Remove Framer initial hidden states from above-the-fold Hero and Header content.

Specifically:

- Do not render LCP candidates with `opacity:0`, `translateY(...)`, or `translateX(...)` in the server HTML.
- Keep Hero and Header visible immediately on first paint.
- If an entrance effect is still desired, use a CSS animation that starts from visible content or only applies after first paint without hiding the LCP element.
- Prioritize removing Framer from:
  - `components/sections/hero.tsx`
  - `components/sections/header.tsx`

Why this is the best next move:

- It directly targets LCP and Speed Index.
- It avoids changing layout, text, colors, navigation, or image loading settings.
- It is more likely to improve the current Lighthouse regression than further below-the-fold bundle shaving.
- It may also allow Framer to be removed from the initial homepage bundle later if remaining motion is pushed below the fold or converted to CSS.

Secondary, after that:

- Convert the hero search form into a tiny client island and make most of Hero a Server Component.
- Dynamically import below-fold interactive sections such as Portfolio and Testimonials.
- Replace `react-icons/fa` WhatsApp icon with a local SVG.
- Review GTM container tags and delay non-essential Ads/remarketing tags until after consent or interaction.

