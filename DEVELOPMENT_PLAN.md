# NGenWay Cannabis — Development Plan

Derived from `NGenWay_Cannabis_Chat_Export.md` and `NGenWay_Cannabis_Deep_Research_Results.md`
(both in this directory as of 2026-09-13). This plan turns the conceptual/prototype
conversation and the completed Deep Research deliverables into a buildable roadmap.

**Status (2026-09-13): Phase 0 anchor-study extraction is complete.** All 3 anchor studies
(Ramesh 2013, Bidwell 2020, McCartney 2021/2022) have been fetched from legitimate sources,
extracted into `/sources/studies.json`, `/content/claims.json` (16 claims), and
`/content/mechanisms.json` (9 mechanisms), and pass `npm run validate:data`. See git log for
the three extraction commits. Remaining before Exhibits can render: Ramesh 2013 figure
digitization (magnitudes for HR/VAS/craving/CO/weight are still `unavailable`, direction/
significance only) and the Vite/React app scaffold itself -- no UI code exists yet.

---

## 0. Evaluation of the source .md files

**`NGenWay_Cannabis_Chat_Export.md`** — the creative-direction conversation: three qualitative
prototype concepts (Exhibits 001, 001 V2, 002), deliberately free of invented numbers, plus the
Deep Research brief that was launched from it.

**`NGenWay_Cannabis_Deep_Research_Results.md`** — the actual completed research deliverable
(A–K as specified in the brief). This is the real spec to build from. It contains:
- Verified anchor studies with citations (Ramesh 2013 / PMID 23937597; Bidwell 2020 / DOI
  10.1001/jamapsychiatry.2020.0927; McCartney 2021 / DOI 10.1016/j.neubiorev.2021.11.004) and a
  comparison table.
- A precise data-extraction target list (design, N, dose, route, timepoints, biomarkers,
  subjective/cognitive/psychomotor/balance measures, statistics) with a **5-state provenance
  system**: exact / calculated / digitized / estimated / unavailable.
- A **4-part evidence/certainty model** per displayed claim: evidence type, data provenance,
  claim status (supported/mixed/speculative/unknown), and interpretation source
  (measured/statistical/authors'/NGenWay inference) — explicitly not collapsed into one score.
- A 5-exhibit catalog (001–005) with control variables, discovery goal, and visual approach for
  each.
- An explicit MVP definition: **Exhibits 001, 002, and 003** (see §3 — this supersedes the
  narrower 001+002-only scope this plan originally assumed before this file was found).
- A suggested repository architecture and a 16-step CLI build order (see §6–7).

**What's still missing (real gap, unchanged):** neither file contains actual extracted
numeric tables — no `studies.json`, no digitized figure series, no CSV. The Deep Research
result is a verified *specification*, not yet populated data. Every number mentioned (2.3×,
0.32 vs 0.14 μg/mL) is a narrative summary of a finding, not a provenance-tagged data point
ready to plot. Phase 0 (§2) still has to happen before any chart is built.

**Directory state:** two markdown files, no git repo, no code, no package manifest. Greenfield
build.

---

## 1. Product Thesis (carried forward, unchanged)

> Cannabis produces multiple signals — potency, consumed dose, blood THC, subjective
> intoxication, cognitive/psychomotor impairment, driving impairment — that people routinely
> collapse into one another. NGenWay visualizes the *gap* between each proxy and the thing it's
> a proxy for, using real study data with explicit provenance and uncertainty, never invented
> numbers.

Working rule: **Never collapse the proxy into the thing it is trying to measure.**

---

## 2. Phase 0 — Data Foundation (blocking, do first)

Nothing downstream should be built on placeholder numbers. This is CLI AI Work Plan steps 1–8
from the Deep Research results, applied to the 3 anchor studies (Ramesh 2013, Bidwell 2020,
McCartney 2021):

1. **Fetch legitimate sources** — PubMed/PMC full text, publisher/DOI pages, supplements, for
   all 3 anchor studies (and their cited primary data where in scope).
2. **Verify bibliography** against the citations already recorded in
   `NGenWay_Cannabis_Deep_Research_Results.md`.
3. **Extract exact numeric values** from tables/text (means, SD/SE, CIs, effect sizes, p-values)
   per the data-extraction target list in that file.
4. **Digitize figures** (WebPlotDigitizer/Engauge) only where numeric source data is
   unavailable — e.g. the Ramesh 2013 time-course "high" curves. Store separately from exact
   data, tagged with figure number, axes, units, extraction method, and uncertainty.
5. **Keep exact and digitized data in separate directories** (`/data/raw` vs `/data/digitized`)
   — never merge silently.
6. **Normalize into CSV/JSON** against the schema in §4.
7. **Build the evidence manifest** — `sources/studies.json` + `sources/bibliography.json`.
8. **Validate provenance** — every value must resolve to one of: exact / calculated /
   digitized / estimated / unavailable. No unlabeled numbers.

Exit criteria for Phase 0: `/data` populated for all 3 anchor studies with real, provenance-tagged
values (or explicit "unavailable at this granularity" records, as correctly identified for
16% vs 24% flower and 70% vs 90% concentrate plasma THC — the source data doesn't support
splitting those).

---

## 3. MVP Scope (Phase 1)

Per the Deep Research results, the MVP is explicitly **Exhibits 001, 002, and 003** (not just
001+002) — all three are anchored to the studies Phase 0 will already have extracted.

**Exhibit 001 — Dose ≠ High** (Ramesh 2013) — Dose × Time Explorer
- Controls: active puffs (0/2/4/6) × minutes after smoking.
- Synchronized outputs: heart rate, subjective high, craving, cognitive/psychomotor
  performance, expired CO/amount smoked.
- Discovery: different dimensions follow different dose-response shapes.

**Exhibit 002 — Potency ≠ Impairment** (Bidwell 2020) — signal-chain visualization
- Product → Potency → Consumed Dose → Exposure → Blood THC → Subjective High → Cognitive/Motor
  Effect → Functional Impairment, with the chain visually stretching/compressing per evidence.
- Four product conditions: 16%/24% flower, 70%/90% concentrate.
- Must not fabricate separate plasma values for 16% vs 24% or 70% vs 90% — the source data
  doesn't support that split; preserve this as a schema-level `unavailable` record, not just
  prose.

**Exhibit 003 — Blood THC ≠ Cannabis BAC** (McCartney 2021) — scatterplots/distributions
- Filters: regular vs. occasional users, inhaled vs. oral, biomarker, outcome category.
- Discovery: biomarker → impairment is a noisy relationship, not a simple threshold —
  directly undercuts any "blood THC as cannabis BAC" framing.

**Shared MVP infrastructure:**
- Normalized data schema + loader every exhibit reuses (§4).
- Provenance/citation component surfacing all 4 dimensions: evidence type, data provenance
  (exact/calculated/digitized/estimated/unavailable), claim status
  (supported/mixed/speculative/unknown), interpretation source.
- Uncertainty rendering (error bars/bands where CIs exist; explicit "no error data" state where
  they don't).
- Study cards + methodology/limitations panel.
- Persistent safety disclaimer: no personalized dosing or safe-to-drive implication; don't
  equate lack of dose-response with lack of impairment; don't generalize chronic-user findings
  broadly; never hide contradictory evidence.
- Responsive + accessible (keyboard-operable controls, ARIA labels on chart values, color-blind
  safe palette — use the `dataviz` skill when building charts).
- Reusable exhibit component structure so 004/005 slot in later without rework.

**Non-goals for MVP:** user accounts, backend/API, Exhibits 004–005, Bayesian/meta-analytic
layer, clinician/researcher/policy modes. These are V1/V2 per the brief.

---

## 4. Data & Content Schema

Static JSON/CSV is sufficient through MVP and V1 — no backend needed for a corpus of a few
dozen studies. Normalized objects, per the Deep Research spec: studies, populations,
conditions, measures, observations, statistics, claims, mechanisms, citations, provenance,
visualization annotations.

`sources/studies.json` entry (per study):
```json
{
  "id": "ramesh-2013",
  "citation": { "authors": "...", "year": 2013, "doi": "...", "pmid": "23937597", "pmc": "PMC4547548" },
  "design": "within-subject double-blind",
  "n": 18,
  "population": "daily marijuana smokers (17 male, 1 female)",
  "conditions": ["0 puffs", "2 puffs", "4 puffs", "6 puffs"]
}
```

`content/claims.json` entry (per finding — this is where the 4-part evidence/certainty model
lives):
```json
{
  "id": "ramesh-2013-hr-dose",
  "study_id": "ramesh-2013",
  "variable": "heart rate",
  "relationship": "dose-dependent increase",
  "evidence_type": "controlled experiment",
  "claim_status": "supported",
  "interpretation_source": "statistical result",
  "observations": [
    { "condition": "0 puffs", "value": null, "unit": "bpm",
      "provenance": "exact", "source_ref": "Table 2" }
  ]
}
```

`provenance` on every observation is one of the 5 states: **exact / calculated / digitized /
estimated / unavailable** — never left unlabeled.

`content/mechanisms.json` holds hidden variables/confounders (self-titration, tolerance,
expectancy, receptor saturation, etc.), each tagged as **demonstrated mechanism / author
interpretation / NGenWay hypothesis** so speculation never gets silently promoted to fact.

`/exhibits/exhibit-NNN/config.json` binds claim ids to a visual spec (chart type, axes,
controls, annotations, the discovery insight) — decoupled from the evidence layer so exhibits
can be re-specified without touching source data.

---

## 5. Technical Architecture

| Concern | Recommendation | Why |
|---|---|---|
| Framework | Vite + React + TypeScript | Matches the rest of the becomiNG stack pattern (see `project_wanderers/app`); no SSR/data-fetching complexity needed for a static-data site. |
| Charts | Observable Plot or D3, per the `dataviz` skill | Precise control over uncertainty bands, small multiples, connected scatterplots — off-the-shelf chart libraries won't do dose×time explorers well. |
| State | URL-synced state (search params) for slider/control positions | Makes every exhibit view shareable/linkable — important for a citation-heavy product. |
| Data layer | Static JSON, validated at build time against JSON Schema | No backend needed through V1; validation catches malformed provenance before deploy. |
| Hosting | Cloudflare Pages, subdomain off `ngengwe.com` (e.g. `cannabis.ngengwe.com` or `ngenway.ngengwe.com`) | Per global deployment convention: one project per subdomain, GitHub → Cloudflare Pages auto-deploy on push to `main`. |
| Repo | New GitHub repo `gngengwe/ngenway-cannabis` (or similar) | Not yet a git repo — needs `git init` + `gh repo create` per standard flow. |

---

## 6. Repository Blueprint

Following the Deep Research results' suggested architecture directly (source-of-truth data
separated from derived/digitized data, content separated from raw evidence, exhibits as
thin config over both):

```
/cannibus
  DEVELOPMENT_PLAN.md          (this file)
  NGenWay_Cannabis_Chat_Export.md
  NGenWay_Cannabis_Deep_Research_Results.md
  CLAUDE.md                    (project-specific context, once code exists)

  /data
    /raw                       # exact extracted values from tables/text
    /derived                   # calculated values (e.g. ratios, deltas)
    /digitized                 # figure-digitized series, tagged with method + uncertainty
    /normalized                # build output: validated, schema-conformant JSON/CSV

  /sources
    studies.json
    bibliography.json

  /content
    claims.json                # findings + 4-part evidence/certainty model (see §4)
    mechanisms.json            # hidden variables/confounders, tagged by interpretation source
    annotations.json           # exhibit-facing callouts/insights text

  /exhibits
    exhibit-001/config.json
    exhibit-002/config.json
    exhibit-003/config.json

  /docs
    methodology.md
    provenance.md
    limitations.md
    research-notes.md

  /scripts
    extraction/                # PDF/HTML → /data/raw
    validation/                # schema + provenance checks, run in CI
    transforms/                # /data/* → /data/normalized

  /app
    components/                # ProvenanceTooltip, UncertaintyBand, SignalChain, MethodologyPanel
    visualizations/            # per-exhibit chart implementations
    pages/

  package.json / vite.config.ts / tsconfig.json
```

---

## 7. Phased Roadmap

Follows the Deep Research results' 16-step CLI AI Work Plan, grouped into phases:

- **Phase 0 — Data foundation** (steps 1–8, blocking): fetch sources, verify bibliography,
  extract exact values, digitize figures where needed, normalize into CSV/JSON, build the
  evidence manifest, validate provenance. No UI work starts before this lands. See §2.
- **Phase 1 — MVP** (steps 9–15): build and validate Exhibit 001 against sources, then 002,
  then 003; add methodology/source/caveat/provenance UI; accessibility + responsiveness
  testing. Deploy static to a `*.ngengwe.com` subdomain.
- **Phase 2 — V1** (step 16 + brief's V1 scope): Exhibits 004 (Same THC ≠ Same Person) and 005
  (Same Product ≠ Same Journey); filtering dimensions across exhibits; expanded citation graph
  — architecture from Phase 0/1 must already support this without rework.
- **Phase 3 — V2**: corpus expansion to dozens/hundreds of studies, Bayesian/meta-analytic
  layer, individual-variability visualization, educational/clinician/researcher/policy modes,
  living evidence updates.

---

## 8. Immediate Next Steps

1. `git init` this directory; create GitHub repo (`gh repo create gngengwe/ngenway-cannabis
   --public --source . --push` or private, per your call) — no code has been committed yet.
2. Start Phase 0 data extraction for the 3 anchor studies (§2) — this is the actual next unit
   of work, not tooling setup.
3. Stand up the Vite/React skeleton + data-validation test harness in parallel, so bad
   provenance fails fast once real data starts landing.
4. Build Exhibit 001 first (simplest: 2 controls, one study) to validate the shared
   infrastructure before 002 and 003.
