# LCP Investigation

Source report: `C:\Users\shree\Downloads\shreeshyamkitchenconsultancy.com-20260718T003630.json`  
URL tested: `https://shreeshyamkitchenconsultancy.com/`  
Lighthouse version: `13.3.0`  
Fetch time: `2026-07-17T19:06:30.435Z`  
Mode: mobile, simulated throttling, 4x CPU slowdown

## Executive Finding

The LCP element in this report is not the hero image. It is the Hero heading:

```html
<h1 class="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground…">
```

Node label:

```text
Transforming Restaurant Ideas Into Profitable Businesses
```

Selector:

```text
div.container > div.grid > div.space-y-8 > h1.font-serif
```

So the exact LCP target is the Hero H1 text, not the main Hero image and not another image.

## LCP Timing

The top-level Lighthouse metric reports:

| Metric | Value |
| --- | ---: |
| Largest Contentful Paint | `8.0 s` |
| Numeric LCP | `8034.885 ms` |
| First Contentful Paint | `5.3 s` |
| Speed Index | `5.3 s` |
| Total Blocking Time | `398.5 ms` |
| Time to Interactive | `13.0 s` |

However, the Lighthouse v13 LCP insight reports the observed trace breakdown for the same LCP node as:

| LCP subpart | Value |
| --- | ---: |
| Time to first byte | `91.904 ms` |
| Resource load delay | Not applicable, because the LCP element is text |
| Resource download | Not applicable, because the LCP element is text |
| Element render delay | `855.749 ms` |
| Observed trace LCP total | about `947.653 ms` |

Important mismatch: `audits.metrics.details.items[0].observedLargestContentfulPaint` is `948 ms`, but the scored `largest-contentful-paint.numericValue` is `8034.885 ms`. This means the poor `8.0 s` score is coming from Lighthouse's simulated mobile model, not from a trace-observed 8 second wait for the H1 to actually paint.

For the simulated `8.0 s` LCP number, because the LCP target is text, there is no LCP image request phase. The closest simulated breakdown is:

| Simulated LCP phase | Value |
| --- | ---: |
| Simulated TTFB from metrics | `795 ms` |
| Resource load delay | Not applicable |
| Resource download | Not applicable |
| Remaining render/model delay | about `7,240 ms` |

## Hero Image Checks

The main Hero image request is present and healthy:

```text
https://shreeshyamkitchenconsultancy.com/_next/image?url=%2Fimages%2Fherologo%2Fheromainlogo.png&w=750&q=75
```

| Check | Result |
| --- | --- |
| Is this the LCP element? | No |
| Image format delivered | `image/webp` |
| Transfer size | `43.6 KB` |
| Resource size | `43.2 KB` |
| Priority | `High` |
| Link preload | `true` |
| Status | `200` |

Conclusion: image preload is working, `fetchPriority` appears to be honored through high network priority, and the preload scanner discovers the image early. Next.js Image optimization is not the reason for the `8.0 s` LCP in this JSON.

## Why LCP Still Reports Around 8 Seconds

The 8 second value is not caused by the Hero image downloading late. It is a simulated Lighthouse result for a text LCP element. The real trace data in the same JSON shows the Hero H1 painting at about `948 ms`.

The simulated score is being hurt by page weight and render-blocking/main-thread work that Lighthouse projects onto a throttled mobile device:

| Area | Evidence |
| --- | --- |
| Large HTML document | Document transfer size `346 KB`, uncompressed response bytes `231,650`, and `document-latency-insight` says no compression was applied |
| Render-blocking CSS/scripts | `render-blocking-insight` estimates `2,490 ms` savings |
| Main-thread work | `6.7 s` total main-thread work, including `3.1 s` script evaluation and `1.17 s` style/layout |
| Third-party scripts | Google Tag Manager/GA/Ads total `493.8 KB` transfer and `140.6 ms` main-thread time in the third-party insight |
| Browser extension contamination | Kaspersky injected CSS/JS appears in the Lighthouse report and is counted as render-blocking/main-thread work |

The Kaspersky resources are especially important because they are not part of the website code:

| Injected resource | Impact shown by Lighthouse |
| --- | ---: |
| `gc.kis.v2.scr.kaspersky-labs.com/.../abn/main.css` | `216 KB`, render-blocking, `1,802 ms` estimated blocking duration |
| `gc.kis.v2.scr.kaspersky-labs.com/.../main.js` | `177 KB`, render-blocking, `900 ms` estimated blocking duration |

This report is therefore partially polluted by a local browser/security extension. The site should not be optimized based on those Kaspersky timings.

## Specific Checks

Image preload is working: yes. The main hero image has `isLinkPreload: true`.

`fetchPriority` is honored: yes, the main hero image network priority is `High`.

Preload scanner discovers the image: yes, the hero image is loaded as an early preload and is not lazy-loaded.

Fonts delay rendering: unlikely in this report. `font-display-insight` passes with no savings, and both font files are preloaded with high priority.

GTM / Google Ads delay rendering: they add weight and main-thread work, but they are not the direct LCP element bottleneck. They still contribute to slower mobile simulation and later interactivity.

CSS blocks rendering: yes. Lighthouse reports render-blocking requests with estimated savings of `2,490 ms`. Part of this is first-party CSS, but the largest blocking item is injected Kaspersky CSS, which is not application code.

Next.js Image optimization delays delivery: no evidence. The hero image is optimized to WebP, high priority, preloaded, `200`, and small enough that it is not the LCP cause.

## Single Highest-Impact Fix

Run the next Lighthouse measurement in a clean Chrome profile with all extensions disabled, especially Kaspersky browser protection, before making another application optimization.

Reason: the current report's biggest render-blocking offenders include non-site Kaspersky CSS/JS. Since the actual LCP element is the Hero H1 and the trace-observed LCP is about `948 ms`, the `8.0 s` score is heavily affected by simulated throttling and polluted render-blocking work. A clean report is the highest-impact next step because it will separate real site bottlenecks from local extension overhead and prevent optimizing the wrong thing.

After a clean report, if LCP is still high, the next site-level target should be reducing render-blocking first-party CSS/HTML weight before changing Hero image loading.
