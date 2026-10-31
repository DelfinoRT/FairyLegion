# Fairy Legion performance audit

Date: 31 October 2026. Scope: repository-wide asset/source review, browser checks on ten pages, Daily Tasks search exercise, and production HTTP header checks. Application behavior was not changed.

## Main conclusion

The largest opportunities are reducing eager media loading, bounding Proficiency's DOM, removing network dependencies from Daily Tasks filtering, and fixing lifecycle cleanup in PokeLegion. There is no evidence here that a framework rewrite or a larger server would address the principal problems. This checkout is a static HTML/CSS/JavaScript site; live responses indicate GitHub Pages behind Cloudflare.

## Method and limits

- Inspected 28 root HTML pages and their local assets, shared scripts, collection features, proficiency rendering, search tools, and game code.
- Used installed Chrome through Playwright, a fresh browser context per page, a 390×844 viewport, and four seconds of observation after DOMContentLoaded. The local server used uncompressed HTTP; there was no network or CPU throttling. External API requests were real.
- `performance-browser-results.json` contains raw observations; `performance-inventory.json` contains static asset inventory. `tools/performance-audit.cjs` reproduces the browser pass. Install Playwright outside the checkout and set `NODE_PATH` to its node_modules directory; `CHROME_PATH` can override the Windows Chrome location. Run `node tools/performance-audit.cjs` from the repository.
- Local resource bytes are completed resource decoded-body sizes, excluding the HTML document, not production wire bytes or decoded bitmap memory. Static inventory counts directly referenced local files, excluding CSS backgrounds and dynamically added assets. These are different measurements.
- The timing measurements are a single diagnostic run on this computer, not mobile user performance or production Core Web Vitals. Short observation can miss late resources and failures. External API performance and results can vary.
- Reported layout-shift values are the sum of observed shifts without recent input, not the official CLS session-window calculation. Use them as diagnostic signals.
- No authenticated administration interface or real-user telemetry is present in the available context. This analysis covers the supplied public site and features; it cannot attribute complaints to an unseen admin backend.

## Browser baseline

MB uses decimal units. Resource counts are completed Performance Resource Timing entries; requests, including failures and pending requests, can be higher.

| Page | Local resource MB | Resources | DOM elements | Observed shift sum | Main-thread tasks over 50 ms |
|---|---:|---:|---:|---:|---|
| Homepage | 85.42 | 78 | 244 | 0.000 | None observed |
| Silvarion collection | 6.29 | 219 | 2,128 | 0.221 | None observed |
| Nemesis collection | 0.55 | 87 | 551 | 0.132 | None observed |
| Proficiency | 1.57 | 11 | 45,297 | 0.048 | 362 ms |
| Daily Tasks | 3.53 | 97 | 322 | 0.000 | None observed |
| Fishing | 5.43 | 152 | 749 | 0.668 | None observed |
| TMs | 1.68 | 27 | 309 | 0.000 | None observed |
| Boss Raids | 0.18 | 8 | 132 | 0.000 | None observed |
| PokeLegion | 3.86 | 53 | 298 | 0.500 | 65 ms |
| PokeDuel | 0.13 | 2 | 189 | 0.000 | None observed |

Daily Tasks resource/DOM observations precede the search exercise; its recorded total request count includes that exercise. No observed long task does not mean a page is fast on slower hardware.

## Prioritized findings

### 1. Homepage gallery dominates download volume — critical, high confidence

Evidence: `index.html` includes 33 gallery images with real `src` attributes. `gallery.js` hides inactive images using classes after discovery; this does not defer their download. The browser completed approximately 85.42 MB of local resources in four seconds. Static direct references total approximately 87.66 MB, including the 2.26 MB audio file. All 55 static image elements lack native lazy loading and explicit width/height attributes.

The gallery totals 76.68 MB, including a 10.11 MB `guild-quests/DiancieCatch.gif`, a 4.07 MB `AmaDiancie.png`, and multiple 2–3 MB screenshots. The hidden images consume bandwidth even when the visitor never opens the gallery.

Recommended change: load one appropriately sized gallery image when the gallery approaches the viewport; request the current and optionally adjacent slides on navigation. Keep other slide URLs in data attributes until needed. Generate responsive screenshot variants and modern formats; retain lossless/pixel-art quality where needed. Convert long animation GIFs to appropriately encoded video with a poster where behavior permits. Set audio preload to `none` if playback is only user-triggered. Preserve original screenshots for explicit full-resolution viewing.

Acceptance: no request for inactive full-size slides on initial navigation; gallery navigation works in both directions; no autoplay audio download; target under 2 MB initial homepage transfer after image optimization, subject to visual review. This is a proposed budget, not a measured post-fix result. Native lazy loading is appropriate for ordinary below-fold images, but the hero/LCP image should remain eager. See [browser image loading guidance](https://web.dev/articles/browser-level-image-lazy-loading).

### 2. Proficiency renders far too much content at once — high, high confidence

Evidence: `Proficiency.js:851` (`buildPokemonCell`) creates every Pokémon tag before adding the `collapsed` CSS class. A collapsed list therefore still contributes its complete DOM. `renderPokemonTable` at line 1015 renders all matching Pokémon; the unfiltered page contains 966 result rows. The combined page reached 45,297 elements and a 362 ms long task on this computer. `togglePokemonRow` refreshes the entire Pokémon table for a single expand/collapse action.

The two generated data scripts total 1,336,664 bytes before transport compression and are loaded before the feature script. This adds download, parsing, and indexing work even before a user explores the data.

Recommended change: render only the first five tags for collapsed proficiency lists; build remaining tags when expanded. Paginate both explorers (for example, 25–50 rows) and update only the detail row being toggled. Keep the existing cached search index and 150 ms Pokémon-search debounce. Avoid rebuilding immutable row metadata and sorting ID lists on each search. Load the explorer dataset on first expansion if the feature is initially closed, with explicit loading/error states; consider a compact shared dataset generated from one source of truth.

Acceptance: bounded DOM growth at initial load and while paging; expanding one row does not replace unrelated rows; searches, sorting, counts, bilingual descriptions, and expanded state remain correct. Proposed initial DOM budget: under 5,000 elements. Measure interaction time and long tasks on a slower CPU before considering a worker; a worker would not solve excessive DOM creation.

### 3. Daily Tasks search repeats API calls and can show stale results — high, high confidence

Evidence: `daily-tasks.js:160` fetches Pokémon API data for every initial task. `renderFilteredResults` at line 46 fetches the matching data again on every input event; clearing repeats the initial requests. In the browser run there were 36 initial API requests, and typing just `ala` caused 24 additional API requests. The task text itself is local but is appended only after the remote sprite lookup succeeds.

There is no cancellation or generation check around async rendering. Earlier searches can append results after a later search has cleared the container. API completion order also determines display order. The run observed a 404 for `jellicent`, and hidden map elements requested placeholder paths such as `xxx.png`, `xx.png`, and the directory `/spawn-maps/`.

Recommended change: render task content synchronously from local records, with a local sprite URL/ID manifest. If API lookups remain necessary, cache promises by normalized Pokémon ID, limit concurrency, and isolate sprite errors from the task content. Filter existing records without issuing requests. Use a render-generation token or AbortController to discard obsolete work. Validate map paths and assign map `src` only when opened. Handle species/form names explicitly.

Acceptance: typing or clearing searches produces zero additional API requests after warm-up; fast typing never appends stale matches; every task remains visible if the API is unavailable; unavailable maps do not create buttons or requests; stable ordering.

### 4. PokeLegion accumulates timers and resize handlers — high, source-confirmed

Evidence: `PokeLegion.js:1702` starts a one-second task-dialog interval. Cleanup is attached to `remove` event listeners at lines 1704 and 1707, but ordinary `Element.remove()` does not dispatch that custom event. The Close callback removes the overlay without clearing the timer. The separate lock-notice interval at line 1669 has no retained handle for disposal.

`renderDepotList` registers a new window resize callback at line 3709 each time the list renders. Search input, type changes, and depot actions rerender it. Only the newest callback is stored on `depotCol`; repeated render calls can retain older callbacks. This is especially relevant to complaints that the page gets slower during a long session. The number and memory cost of accumulated objects were not measured in this pass.

Recommended change: give each dialog an explicit idempotent dispose function that clears every interval, removes window listeners, and closes the overlay on every exit path. Register the depot resize callback once per mounted depot, or use CSS grid `auto-fit/minmax` where possible. Keep important save operations reliable; synchronous whole-player JSON writes at `savePlayer` should be profiled against large saved depots before introducing batching.

Acceptance: repeat open/close of Tasks 50 times and depot filter/search 100 times; active timers and registered resize listeners return to baseline after close; heap snapshots show no growing collection of detached dialogs. Preserve task timing and saved progress. [Element.remove documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) describes the DOM operation; cleanup must be explicit.

### 5. Collections fetch unrelated source code to derive type data — medium, high confidence

Evidence: `coleccion-silvarion.js:416` lists seven feature scripts; line 599 fetches all seven as text and parses Pokémon types with regular expressions. That is approximately 200 KB of unrelated source per uncached visit, plus parsing and per-card DOM changes. It also couples collection correctness to the textual formatting of other features.

The Silvarion page statically contains 410 images with no lazy attributes, then adds type icons and live-team images. The browser saw 726 image elements and 219 completed resources. Its banner alone is 5.09 MB. Nemesis also has eager collection sprites.

Recommended change: generate a compact Pokémon/type JSON manifest during maintenance, or emit type badges into collection markup from a shared data source. Optimize the banner for its displayed size. Defer offscreen/collapsed-section sprites; provide fixed sprite dimensions and defer animated previews until hover/focus or visible sections. Avoid introducing a framework solely for this.

Acceptance: zero requests for unrelated feature source scripts from a collection; identical type badges; collapsed sections do not fetch their entire sprite set; banner target below 300 KB if visual quality permits. Validate keyboard access to deferred previews.

### 6. Layout instability and continuous decorative work — medium, mixed confidence

Evidence: Fishing, both collections, and PokeLegion showed substantial layout shifts in the short observation window. Many static images omit HTML dimensions; CSS may size some of them, so missing attributes alone do not prove the cause of each shift. Inspect individual layout-shift sources before attributing all shifts to media.

`script.js:56` and line 79 run two particle intervals continuously, collectively creating ten decorative DOM nodes per second with three-second lifetimes. The homepage recreates ten footer image elements every 650 ms, even with the footer outside the viewport. This is background churn; no substantial main-thread stall from it was observed on the audit computer.

Recommended change: reserve image/banner/card space with width/height or aspect-ratio, reserve asynchronous widget space, and investigate profile-modal positioning. Pause decorative work when hidden or outside the viewport and respect reduced-motion preferences. Reuse footer sprite nodes and update only changed sources. Keep these changes behind the higher-impact download/DOM fixes.

Silvarion polling occurs every 15 seconds when enabled by server state, with `cache: 'no-store'`, no visibility check, and no in-flight guard. Pause while hidden, prevent overlapping requests, add timeouts and failure backoff, and keep cached character data visible during failures. A live character endpoint returned 403 during the run; API availability needs independent monitoring.

Acceptance: stable media/widget space during slow loading; no decorative DOM churn in hidden/offscreen sections; no overlapping polls. Validate real CLS using session windows and real-user measurements.

### 7. Shared script errors and missing resources — medium, confirmed

Evidence: homepage `flag.js` sets text on an absent flag element and throws. Proficiency and TMs load `pagination.js`, which immediately registers a listener on an absent `search-input`. The homepage footer references missing `snorlax.png` and `mew.png`, producing repeated 404s during cycling. These errors are functional/maintenance defects; fixing them alone will not remove the biggest download cost.

Recommended change: include page-specific modules only on relevant pages and guard optional elements. Separate navigation/decoration from fishing-specific data and handlers in shared `script.js`. Validate generated asset references during publishing. Check console errors after using search, navigation, expansion, and games, not just on initial load.

Acceptance: zero uncaught exceptions and zero missing first-party asset requests across the page/interaction matrix.

### 8. Delivery and caching need targeted changes — medium, production-checked

On the audit date, production homepage headers showed `Cache-Control: max-age=600`; the generated proficiency level script showed gzip compression and `max-age=14400`. Its HEAD response advertised 92,540 compressed bytes. The remote deployed file's metadata differs from the local file, so this is not a local compression ratio and production/local content parity was not established. Cloudflare and GitHub cache headers were present. Compression is already enabled for that sampled asset.

Recommended change: verify compression and cache-hit behavior for representative HTML, CSS, JS, images, and fonts with repeated requests. Use content-hashed filenames and long-lived immutable caching for generated assets when supported by the hosting/CDN configuration; keep HTML short-lived or revalidated so releases reference the new hashes. Do not apply immutable caching to today's mutable filenames. Optimize media before spending time on small script minification wins.

## Suggested implementation sequence

1. **First batch (roughly 1–2 days):** defer homepage gallery/audio; optimize its largest images; render tasks locally and remove invalid map requests; fix missing assets and irrelevant scripts.
2. **Second batch (roughly 2–4 days):** bound Proficiency lists and implement incremental expansion; repair dialog/timer/listener cleanup; replace source-code type scraping with generated data.
3. **Third batch (roughly 1–3 days):** optimize banners and remaining guide media, reserve layout space, pause offscreen decoration/polling, and tune asset caching with versioned filenames.

These are planning estimates, dependent on media quality requirements and deployment access. No fixes or claimed savings have been benchmarked yet.

## Verification and ongoing measurement

- Establish three-run medians on a representative slow mobile profile and normal desktop, with cold and warm caches. Cover homepage, both collections, Proficiency, Daily Tasks, fishing, and long game sessions.
- Capture production transferred bytes, LCP, proper CLS, request failures, and interaction timings. Add real-user measurement of LCP/INP/CLS by page and device class; avoid collecting search text, player names, or saved game data.
- Use the standard good-experience targets at the 75th percentile: LCP ≤2.5 seconds, INP ≤200 ms, CLS ≤0.1. These are real-user targets, not conclusions from this local run. See [Web Vitals guidance](https://web.dev/articles/vitals).
- Add lightweight checks for referenced asset existence, unexpected uncaught exceptions, initial transfer budgets, and bounded Proficiency row counts. Include search during delayed/out-of-order API responses and 50-cycle modal cleanup as meaningful regression scenarios.
- Compare identical routes, datasets, saved-game sizes, browsers, and network profiles before and after each batch. Publish measured changes rather than projecting byte savings into a guaranteed time improvement.
