# Performance And Architecture Audit

Audit date: 2026-07-17  
Project: Next.js App Router site for Shree Shyam Kitchen Consultancy  
Scope: read-only audit of performance, bundle architecture, analytics scripts, hydration/console risk, accessibility, and large imports.

## Build Result

Production build was run with:

```bash
npm.cmd run build
```

Result: passed.

Notes:
- The sandboxed build first failed with `EPERM: operation not permitted, stat 'C:\Users\shree\OneDrive\Desktop'`.
- The same build passed outside that sandbox limitation.
- Next.js 16.2.6 with Turbopack compiled successfully.
- Static routes generated: `/`, `/_not-found`, `/blog`, the three blog article routes, and `/sitemap.xml`.

## High-Level Findings

- The homepage imports all sections statically from `app/page.tsx`, so every homepage section participates in the initial route graph.
- Most homepage sections are `"use client"` components because Framer Motion is mixed directly into otherwise static content.
- `framer-motion` is already wrapped with `LazyMotion` in `components/ui/motion-provider.tsx`, which is good, but the client boundary is still broad.
- `AnimatedCounter` is used in `components/sections/hero.tsx` and `components/sections/stats.tsx`.
- Analytics in `app/layout.tsx` currently includes Vercel Analytics, Vercel Speed Insights, and Google Tag Manager. Direct GA4 and Google Ads scripts are not visible in source.
- Several source image assets are very large, including `public/images/portfolio/kitchenimage2.png` at about 27.7 MB and `public/images/portfolio/kitchenimage.png` at about 14 MB.
- No application files were changed for this audit.

## Client Component Inventory

Homepage/content client components:
- `components/sections/header.tsx`
- `components/sections/hero.tsx`
- `components/sections/services.tsx`
- `components/sections/stats.tsx`
- `components/sections/about.tsx`
- `components/sections/why-choose-us.tsx`
- `components/sections/process.tsx`
- `components/sections/portfolio.tsx`
- `components/sections/clients.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/cta.tsx`
- `components/sections/footer.tsx`
- `components/ui/animated-counter.tsx`
- `components/ui/motion-provider.tsx`
- `components/ui/whatsapp-button.tsx`

UI library client components present in the repository:
- Many `components/ui/*` primitives are client components, including accordion, dialog, dropdown, chart, carousel, command, drawer, form, select, sheet, sidebar, toast, tooltip, and others.
- These do not necessarily affect the homepage bundle unless imported by routed components.

## Framer Motion Inventory

Files importing `framer-motion`:
- `components/sections/about.tsx`
- `components/sections/clients.tsx`
- `components/sections/cta.tsx`
- `components/sections/footer.tsx`
- `components/sections/header.tsx`
- `components/sections/hero.tsx`
- `components/sections/portfolio.tsx`
- `components/sections/process.tsx`
- `components/sections/services.tsx`
- `components/sections/stats.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/why-choose-us.tsx`
- `components/ui/animated-counter.tsx`
- `components/ui/motion-provider.tsx`
- `components/ui/whatsapp-button.tsx`

## AnimatedCounter Usage

- `components/sections/hero.tsx`
- `components/sections/stats.tsx`
- implementation: `components/ui/animated-counter.tsx`

## Prioritized Recommendations

### P0 - Keep The Build Green

File path: project root  
Current problem: the production build passes, so there is no blocking compile problem to fix before optimization.  
Exact proposed change: keep using `npm.cmd run build` after each optimization batch and do not combine unrelated changes in the same batch.  
Expected benefit: prevents performance work from accidentally introducing runtime, TypeScript, or static generation regressions.  
Risk level: low.  
Visual design change: no.

### P1 - Reduce Homepage Client JavaScript By Splitting Static Sections From Motion

File path: `components/sections/services.tsx`, `components/sections/about.tsx`, `components/sections/why-choose-us.tsx`, `components/sections/process.tsx`, `components/sections/cta.tsx`  
Current problem: these sections are mostly static content but import `framer-motion`, making the entire sections client components.  
Exact proposed change: convert the static markup/data rendering to Server Components, then isolate only animation behavior into a tiny client wrapper such as `MotionReveal` or use CSS/Tailwind animation where acceptable. Keep the same markup, classes, text, images, and layout.  
Expected benefit: removes large portions of below-fold static content from the hydrated client tree and lowers initial JavaScript/hydration work.  
Risk level: medium, because animation timing must be matched carefully.  
Visual design change: no, if animation variants and classes are preserved.

### P1 - Keep Interactive Sections Client, But Shrink Their Client Boundaries

File path: `components/sections/hero.tsx`, `components/sections/portfolio.tsx`, `components/sections/testimonials.tsx`, `components/sections/clients.tsx`, `components/sections/stats.tsx`  
Current problem: these files contain real interactivity, but static content and interactive logic are bundled together.  
Exact proposed change: split each into a server-rendered shell plus smaller client islands: hero search form, portfolio filters/show-more controls, testimonial carousel controls, clients animation trigger, and stats counters.  
Expected benefit: keeps current behavior while reducing hydration cost and improving time to interactive.  
Risk level: medium.  
Visual design change: no, if component boundaries preserve the same DOM/classes.

### P1 - Optimize Very Large Image Assets

File path: `public/images/portfolio/kitchenimage2.png`, `public/images/portfolio/kitchenimage.png`, `public/images/blog/restaurant-marketing.jpg`, `public/images/blog/blogimage1.png`, `public/images/herologo/kitchenlayout1.png`, `public/images/herologo/hero2logo.png`, `public/images/herologo/heromainlogo.png`  
Current problem: several source assets are multi-megabyte files; the largest observed asset is about 27.7 MB. This can increase local processing, cache pressure, and image response cost, and can hurt real-user performance if originals are ever served directly.  
Exact proposed change: export visually identical compressed WebP/AVIF or optimized JPG versions at display-appropriate dimensions, update references only after visual comparison, and keep `next/image` for responsive delivery.  
Expected benefit: smaller image transfer, faster image optimization, lower LCP/INP risk, and better mobile performance.  
Risk level: medium, because compression must be visually checked.  
Visual design change: no, if images are exported at the same crop/aspect and quality is verified.

### P1 - Fix Header Heading Semantics

File path: `components/sections/header.tsx`  
Current problem: the header brand uses an `<h1>` while the hero also has the real page `<h1>`. This creates multiple top-level headings and weakens page structure for accessibility and SEO.  
Exact proposed change: change the header brand `<h1>` to a non-heading element such as `<span>` or `<p>` while preserving the exact className and visible text.  
Expected benefit: cleaner heading order and better assistive technology navigation.  
Risk level: low.  
Visual design change: no.

### P1 - Add Accessible Names To Icon-Only Controls

File path: `components/sections/header.tsx`, `components/sections/testimonials.tsx`  
Current problem: the mobile menu icon button and testimonial previous/next buttons do not expose clear accessible names. Testimonial dot buttons also lack labels.  
Exact proposed change: add `aria-label` to the mobile menu button, previous/next buttons, and each testimonial dot, for example `Open menu`, `Close menu`, `Previous testimonial`, `Next testimonial`, and `Go to testimonial 1`. Add `aria-current` to the active dot.  
Expected benefit: better screen reader support and clearer keyboard navigation.  
Risk level: low.  
Visual design change: no.

### P1 - Make Decorative Images And Icons Silent To Screen Readers

File path: `components/sections/stats.tsx`, `components/sections/process.tsx`, `components/sections/testimonials.tsx`, `components/sections/services.tsx`  
Current problem: some background or decorative visuals use descriptive alt text even though they do not add content. Decorative numeric labels and icons may add noise.  
Exact proposed change: use `alt=""` on decorative background images and add `aria-hidden="true"` to decorative icons/numbers where nearby text already communicates the meaning. Keep meaningful images, such as portfolio project images and founder imagery, descriptive.  
Expected benefit: cleaner screen reader experience without changing layout.  
Risk level: low.  
Visual design change: no.

### P2 - Review Analytics Architecture And Event Tracking

File path: `app/layout.tsx`, `components/ui/whatsapp-button.tsx`  
Current problem: layout loads Vercel Analytics, Speed Insights, and GTM. Direct GA4/Google Ads scripts are not present in source, but Google Ads/GA may still be injected from the GTM container. The WhatsApp button checks `window.gtag`, which may be undefined when only GTM is installed.  
Exact proposed change: choose one analytics architecture: either manage GA4/Ads inside GTM and send events through `dataLayer`/`sendGTMEvent`, or load GA4 directly and keep `gtag` events. Avoid doing both. Update WhatsApp event tracking to match the chosen architecture.  
Expected benefit: avoids duplicate pageviews/conversions and makes lead tracking reliable.  
Risk level: medium, because analytics configuration should be verified in GTM/GA dashboards.  
Visual design change: no.

### P2 - Verify The `@next/third-parties/google` Import Shape

File path: `app/layout.tsx`  
Current problem: the source imports `GoogleTagManager` from `@next/third-parties/google`. The client reference manifest also references GA-related third-party code, likely because the package entry exports multiple Google helpers.  
Exact proposed change: check whether the installed package supports a narrower GTM-only import path, or verify with a bundle analyzer before changing it. If a narrower supported import exists, use that path.  
Expected benefit: may remove unused third-party helper code from the client graph.  
Risk level: low to medium, depending on package support.  
Visual design change: no.

### P2 - Dynamically Import Only True Below-Fold Interactive Islands

File path: `app/page.tsx`, `components/sections/testimonials.tsx`, `components/sections/portfolio.tsx`, `components/sections/clients.tsx`  
Current problem: all homepage sections are statically imported. Some below-fold interaction, especially testimonials and portfolio filtering, can wait until after initial render, but dynamic-importing entire content sections could hurt SEO and content availability.  
Exact proposed change: after server/client splitting, dynamically import only the interactive islands for testimonials controls, portfolio filter behavior, and clients animation. Use reserved layout space or server-rendered static content to avoid layout shift.  
Expected benefit: lowers initial JavaScript while preserving visible content and SEO.  
Risk level: medium.  
Visual design change: no, if fallbacks preserve dimensions.

### P2 - Reconsider AnimatedCounter Hydration Strategy

File path: `components/ui/animated-counter.tsx`, `components/sections/hero.tsx`, `components/sections/stats.tsx`  
Current problem: `AnimatedCounter` uses client state, `requestAnimationFrame`, and Framer `useInView`. It is used in two sections, causing hydration for visual-only number animation.  
Exact proposed change: render the final number server-side as the accessible baseline, then progressively enhance the count-up animation only when the counter is near the viewport. Alternatively, replace Framer `useInView` with a tiny IntersectionObserver hook.  
Expected benefit: less Framer/client work for non-critical visual enhancement and better no-JS accessibility.  
Risk level: medium.  
Visual design change: no, if count-up timing and final values are preserved.

### P2 - Replace `react-icons/fa` For One WhatsApp Icon

File path: `components/ui/whatsapp-button.tsx`  
Current problem: the floating WhatsApp button imports `FaWhatsapp` from `react-icons/fa` for a single icon.  
Exact proposed change: replace it with an inline optimized SVG or an existing local icon asset, preserving the same visible size/color.  
Expected benefit: removes a package import from a globally loaded client component.  
Risk level: low.  
Visual design change: no.

### P2 - Convert Blog Raw Images To `next/image`

File path: `components/blog/BlogImage.tsx`  
Current problem: blog article images use a raw `<img>`, bypassing Next image optimization, responsive `sizes`, and lazy-loading controls.  
Exact proposed change: replace the internal `<img>` with `next/image`, require width/height or a known aspect ratio, and pass through existing `src`, `alt`, and class behavior.  
Expected benefit: better image optimization and reduced layout shift risk on blog pages.  
Risk level: medium, because dimensions and article layout need verification.  
Visual design change: no, if dimensions and object-fit are matched.

### P2 - Add Focus Styles To Custom Non-UI Buttons

File path: `components/sections/portfolio.tsx`, `components/sections/testimonials.tsx`  
Current problem: some custom `<button>` elements rely mostly on hover/active visuals and may not have obvious keyboard focus indicators.  
Exact proposed change: add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` or matching existing design-system focus classes to custom buttons.  
Expected benefit: better keyboard accessibility with no mouse-user visual change.  
Risk level: low.  
Visual design change: no in normal state; yes only during keyboard focus, intentionally.

### P3 - Audit Unused UI Primitives And Heavy Dependencies

File path: `components/ui/*`, `package.json`  
Current problem: the repository includes many client UI primitives and heavy optional libraries such as `recharts`, `embla-carousel-react`, `cmdk`, `vaul`, `react-hook-form`, and many Radix packages. They are not necessarily shipped unless imported, but they add maintenance and accidental-import risk.  
Exact proposed change: after bundle analysis, remove unused generated UI primitives and dependencies that are not referenced by routed code. Do this in a separate cleanup commit.  
Expected benefit: smaller install size, less accidental bundle growth, and simpler codebase.  
Risk level: medium, because some components may be planned for future use.  
Visual design change: no.

### P3 - Confirm Missing Resource And Console Status In A Browser Pass

File path: whole app, especially `app/layout.tsx`, `components/sections/*`, `public/images/*`  
Current problem: the production build does not reveal runtime 404s, hydration warnings, or third-party script console errors. Local Lighthouse may show Vercel Analytics or Speed Insights 404s because those endpoints are deployment-specific.  
Exact proposed change: run a production server or deployed preview, capture browser console and network failures, and treat local `_vercel/insights/script.js` or `_vercel/speed-insights/script.js` 404s as deployment-context checks rather than source-code failures.  
Expected benefit: separates real broken resources from local-only analytics behavior.  
Risk level: low.  
Visual design change: no.

## Below-Fold Dynamic Import Candidates

Best candidates after server/client splitting:
- `components/sections/testimonials.tsx`: dynamic-import carousel controls or the carousel client island, while server-rendering testimonial content.
- `components/sections/portfolio.tsx`: dynamic-import filters/show-more behavior, while server-rendering initial project cards.
- `components/sections/clients.tsx`: dynamic-import animation/enhancement only, while server-rendering logos.
- `components/sections/stats.tsx`: dynamic-import or lazy-hydrate counters only, while server-rendering final values.

Avoid dynamic-importing entire SEO/content sections first:
- `components/sections/services.tsx`
- `components/sections/about.tsx`
- `components/sections/process.tsx`
- `components/sections/why-choose-us.tsx`
- `components/sections/cta.tsx`
- `components/sections/footer.tsx`

For those, server conversion is safer than dynamic import because it keeps content immediately available to users and crawlers.

## Suggested Implementation Order

1. Accessibility-safe fixes: header brand heading, icon button labels, testimonial dot labels, decorative image alts.
2. Analytics decision: confirm whether GA4/Google Ads live only in GTM and align WhatsApp event tracking.
3. Image compression pass with visual comparison.
4. Split static sections from Framer Motion, starting with `CTA`, `About`, `Services`, and `WhyChooseUs`.
5. Split interactive sections into server shells plus client islands.
6. Add dynamic imports only for below-fold interactive islands.
7. Run bundle analyzer and remove unused UI/dependency weight.

## Verification Checklist For Future Changes

- Run `npm.cmd run build`.
- Compare desktop and mobile screenshots before/after.
- Check browser console for hydration warnings and runtime errors.
- Check Network tab for 404s.
- Confirm GTM/GA4/Ads events fire once.
- Re-run Lighthouse or Vercel Speed Insights after deployment.
