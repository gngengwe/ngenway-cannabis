# Cannibus visual asset handoff

The new artwork lives in `app/public/assets/`. These are intentionally SVG rather than raster images: they stay sharp in charts, are lightweight, and use the existing CSS palette (`--accent`, `--form-concentrate`, `--status-warning`, and the surface colors).

## Brand and story

| Asset | Put it here | Suggested treatment |
| --- | --- | --- |
| `brand-mark.svg` | `app/src/Layout.tsx`, inside the home `NavLink`, before `NGenWay Cannabis` | 28-32px square mark; keep the wordmark text, align both on one row; use the mark as the favicon later |
| `hero-signal-chain.svg` | `app/src/pages/Story.tsx`, inside the HERO section below the supporting paragraph | Full-width image capped at 720px, `aspect-ratio: 1200 / 560`; reveal after the headline; hide below 420px wide if the hero becomes too tall |
| `hero-dose-dial.svg` | `app/src/pages/Story.tsx`, at the start of Act one | Use as a quiet right-side or full-width figure above the three study cards; add a short visible caption: `A larger nominal dose does not guarantee a larger measured effect.` |

## Exhibit 001: Dose != High

| Asset | Put it here | Suggested treatment |
| --- | --- | --- |
| `exhibit-001-pulse.svg` | `app/src/pages/Exhibit001.tsx`, beside the `BODY — heart rate` heading | Small 96px decorative figure or a 240px wide explanatory figure on desktop; do not place it inside the chart plot area |
| `exhibit-001-high-flatline.svg` | Above the two `TimeCourseChart` panels in the EXPERIENCE section | Full-width section figure at 520-720px; it previews the central contrast before interaction; label it as an illustration, not source data |
| `exhibit-001-inhale.svg` | Just before `MethodologyPanel` on Exhibit 001 | 220px wide figure aligned with the self-titration explanation; use the existing `TIME_NOTE` or methodology copy for the caption |

## Exhibit 002: Potency != Impairment

| Asset | Put it here | Suggested treatment |
| --- | --- | --- |
| `exhibit-002-flower-concentrate.svg` | Inside the `FormLegend` container, above or left of the legend | 260-320px wide; use it as the orientation image for flower vs concentrate, not as a product image |
| `exhibit-002-blood-gap.svg` | Between the `FormLegend` and `The signal chain` heading | Full-width figure capped at 720px; use the same blue/orange form colors as the legend |
| `exhibit-002-balance.svg` | Beside the `Balance (eyes closed)` `GroupTimeCourseChart` card | 150-220px wide on desktop; stack above the chart on narrow screens; keep the chart itself authoritative |

## Exhibit 003: Blood THC != Cannabis BAC

| Asset | Put it here | Suggested treatment |
| --- | --- | --- |
| `exhibit-003-biomarker.svg` | Between the occasional-user copy and its `ForestPlot` | 300-420px wide, centered; use as a visual cue for confidence intervals crossing zero |
| `exhibit-003-population.svg` | Between the corpus stat tiles and the first user-population section | 300-480px wide; use to introduce the occasional vs regular comparison before the plots |

## Reusable UX elements

| Asset | Put it here | Suggested treatment |
| --- | --- | --- |
| `ui-provenance-stamp.svg` | `app/src/components/ProvenanceBadge.tsx` as the expanded badge icon | 16-20px inline icon for exact/calculated/estimated states; preserve the text badge for accessibility |
| `ui-gap-marker.svg` | `app/src/pages/Story.tsx` in `Gap`, and optionally in exhibit headers | Use at 32-48px wide where the current text-only `!=` marker feels too plain; keep `aria-hidden` and retain meaningful text nearby |

## Implementation rules for Claude

1. Treat the artwork as editorial figures, not as data. Charts and values remain the source of truth.
2. Add `alt` text for every informative figure. For decorative copies, use an empty `alt` and keep the nearby heading meaningful.
3. Use lazy loading for figures below the first viewport and `loading="eager"` only for the hero mark or hero figure.
4. Keep the existing dark palette and do not add filters, gradients, or product photography. These illustrations are meant to make the evidence structure visible.
5. Add captions in the existing muted text style. A caption should say whether the figure is an illustration, a direct source figure, or a derived comparison.
6. On mobile, stack figure and chart content rather than overlaying them. Give each figure a stable `aspect-ratio` so controls do not jump while it loads.
7. Preserve the persistent safety banner and methodology panels. Artwork must never imply a personal dose, impairment estimate, or legal threshold.

## Asset count

There are 13 new SVG assets: 1 brand mark, 10 evidence/story figures, and 2 interface motifs.