# Performance implementation

Implemented locally on 31 October 2026. No publishing, deployment, or CDN configuration changes were performed.

## Changes

- Homepage gallery requests only visited slides, starting when it approaches the viewport. Optimized screenshot variants link to the original files. Audio no longer preloads, and footer monitors reuse nodes and pause offscreen, in background tabs, and for reduced motion.
- Generated 85 optimized image references in `optimized-images/manifest.json`. Diagrams and ordinary images use lossless WebP; gallery screenshots and the large banner/hero use scaled display variants. Original files are retained. The Silvarion banner fell from 5,091,303 to 158,406 bytes. Added lazy loading for secondary static images across pages.
- Daily Tasks renders all task text synchronously and filters existing cards. Its 36 default sprites are vendored locally (39,321 bytes total), replacing runtime PokeAPI calls. Invalid map buttons are omitted; valid maps load only when opened. Search cannot append obsolete asynchronous results.
- Proficiency and Pokémon explorers show 25 results per page with bilingual controls and full-result counts. Collapsed tag lists create only five tags; expanding a Pokémon updates only that detail row. Existing search indexing, sorting, translations, and expansion state remain supported.
- PokeLegion explicitly clears both task-dialog intervals on close. Depot filtering relies on its responsive CSS grid and registers no resize listeners. Reserved profile dimensions reduce shifts while avatars load; depot columns wrap inside the available area.
- Collection type badges use an 18,436-byte generated JSON file instead of fetching and scanning seven scripts totaling 202,169 bytes. Polling pauses in hidden tabs, prevents overlapping requests, times out, and backs off after failures.
- Reserved space for banners, character/team widgets, and the fishing picker. Fishing's full searchable list now scrolls within a 420px area; offscreen sprites load lazily. Collection fonts use optional loading to prevent late font swaps.
- Guarded absent optional flag/back-to-top elements and removed irrelevant achievement-pagination scripts from Proficiency and TMs. Shared particle effects stop in hidden tabs and for reduced motion.

## Local before/after measurements

Same audit harness and 390×844 viewport, fresh browser contexts, uncompressed loopback HTTP, no CPU/network throttling, four-second observation. Measurements are individual diagnostic samples, not production scores. HTML bytes are excluded. The homepage row was refreshed after its final proportional-image sizing change.

| Measurement | Before | After |
|---|---:|---:|
| Homepage completed local resource bodies | 85.42 MB | 1.38 MB |
| Silvarion completed local resource bodies | 6.29 MB | 0.35 MB |
| Fishing completed local resource bodies | 5.43 MB | 0.83 MB |
| Daily Tasks completed local resource bodies | 3.53 MB | 0.59 MB |
| Proficiency initial DOM elements | 45,297 | 1,034 |
| Proficiency Pokémon result rows | 966 | 25 |
| Proficiency main-thread tasks >50 ms | 362 ms task | None observed |
| Daily Tasks API requests when typing `ala` | 24 | 0 |
| Fishing observed shift sum | 0.668 | 0.000 |
| Silvarion observed shift sum | 0.221 | 0.017 |
| Nemesis observed shift sum | 0.132 | 0.002 |
| PokeLegion observed shift sum | 0.500 | <0.001 |

Resource savings mainly reflect assets omitted from initial navigation, plus image optimization; scrolling or visiting more gallery slides deliberately loads more content. Daily Tasks can initiate deferred local sprite requests when layout/visibility changes, but never calls the API. Shift sums are diagnostic observations, not the official CLS session-window calculation. The final narrow-screen starter-grid adjustment was verified functionally after the recorded PokeLegion timing sample.

Raw before/after observations: `performance-browser-results.json` and `performance-browser-after.json`. Production content and CDN transfer sizes were not benchmarked after these changes.

## Validation

`tools/performance-regression.cjs` passed all scenarios:

1. Gallery stays unloaded offscreen, loads only visited slides, wraps navigation, and preserves original-image links.
2. Daily Tasks renders with external networking blocked; every local sprite decodes; filtering, no-results, clearing, and on-demand maps work without API requests.
3. Silvarion type badges load from the manifest without fetching unrelated scripts; optimized banner decodes.
4. Proficiency stays below 5,000 initial elements; both tables page correctly; expansion preserves unrelated DOM nodes; tag lists expand/collapse; search, sorting, translation, and empty results work.
5. Fishing's bounded picker supports search and selection.
6. PokeLegion trainer creation works at a 390px viewport; 50 task-dialog cycles retain no intervals, including the selection-lock timer; 100 depot searches retain no resize listeners; depot closes successfully at desktop width.

The regression scenarios emitted no uncaught script errors or missing first-party responses on the monitored pages. Syntax checks passed for changed JavaScript. Validated all 96 optimized-image HTML references and checked patch whitespace. Gallery and collection screenshots were inspected.

## Regeneration and follow-up

Run `python tools/optimize-site-images.py` with Pillow installed after changing source images. Run `node tools/generate-pokemon-types.cjs` after changing Pokémon type records or the explicit fallback map in that generator. Commit the regenerated assets/manifest alongside their references.

To run browser checks in PowerShell without adding package dependencies to the site:

```powershell
$auditDir = Join-Path $env:TEMP 'fairylegion-performance-audit'
npm install --prefix $auditDir playwright --no-audit --no-fund
$env:NODE_PATH = Join-Path $auditDir 'node_modules'
node tools/performance-regression.cjs
$env:AUDIT_OUTPUT = 'docs/performance-browser-after.json'
node tools/performance-audit.cjs
```

`CHROME_PATH` overrides the installed Windows Chrome location. `AUDIT_PAGES` optionally selects comma-separated HTML pages. Leave the original baseline file intact when comparing subsequent changes.

The third-party character endpoint still returned HTTP 403 during checks, and externally supplied team image URLs can fail. That service's availability cannot be repaired in this repository; its existing embed fallback remains. Long-lived immutable CDN caching and production real-user telemetry remain deployment/hosting follow-ups. Neither is required to use the implemented local improvements, and no production speed guarantee is inferred from these lab runs.
