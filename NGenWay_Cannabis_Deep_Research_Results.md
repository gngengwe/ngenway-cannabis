# NGenWay Cannabis — Deep Research Results

## Executive Summary

NGenWay Cannabis is an evidence-visualization project focused on the gaps between cannabis potency, dose, exposure, subjective effects, and impairment.

Core chain:

**Product potency → consumed/inhaled dose → systemic exposure → subjective experience → functional impairment**

Each arrow is an empirical relationship to investigate, not an equivalence to assume.

### Anchor findings

**Ramesh et al. 2013 — Marijuana’s Dose-Dependent Effects in Daily Marijuana Smokers**
- N=18 daily smokers (17 male, 1 female), within-subject double-blind design.
- Conditions: 0, 2, 4, or 6 active THC puffs.
- Heart rate increased and craving decreased dose-dependently.
- Subjective “high,” strength, liking, good effect, and take-again ratings increased with active cannabis but were not dose-dependent among active conditions.
- Expired CO and cigarette-weight evidence suggested participants inhaled less active cannabis, supporting self-titration as a possible explanation.
- PMID 23937597; PMCID PMC4547548.

**Bidwell et al. 2020 — Association of Naturalistic Administration of Cannabis Flower and Concentrates With Intoxication and Impairment**
- JAMA Psychiatry; DOI 10.1001/jamapsychiatry.2020.0927.
- N=121 regular cannabis users.
- Compared 16%/24% THC flower with 70%/90% THC concentrates.
- Mean acute plasma THC after use was approximately 0.32 μg/mL among concentrate users versus 0.14 μg/mL among flower users.
- Despite substantially greater THC exposure, subjective intoxication and most neurobehavioral outcomes did not differ correspondingly by product type or potency.
- Delayed verbal memory and balance were impaired after use.

**McCartney et al. 2021 — THC biomarkers and impairment meta-regression**
- Neuroscience & Biobehavioral Reviews; DOI 10.1016/j.neubiorev.2021.11.004.
- 28 studies / 822 outcomes.
- Blood/oral THC, metabolites, and subjective intoxication generally showed weak relationships with driving/cognitive impairment.
- Relationships differed by route and frequency of cannabis use and were particularly limited in regular users.
- Conclusion: blood/oral-fluid THC concentrations are relatively poor standalone indicators of cannabis-induced impairment.

## Research Thesis

Cannabis produces multiple signals that are routinely collapsed into one another:

**Potency ≠ dose consumed ≠ blood THC ≠ feeling high ≠ impairment.**

The visualization system should make the distance between these signals visible.

## Data Extraction Targets

For each high-value study collect:

- Study ID, title, authors, year, DOI, PMID/PMC.
- Design: controlled, crossover, naturalistic, observational, systematic review, meta-analysis.
- Sample size and demographics.
- Cannabis-use frequency/tolerance.
- Product/formulation, THC/CBD concentration.
- Administered and consumed dose.
- Route and inhalation/puff-topography information.
- All measurement timepoints.
- Plasma/serum/whole-blood THC and metabolites.
- Subjective intoxication/VAS measures.
- Heart rate and other physiology.
- Cognition, memory, attention and psychomotor outcomes.
- Balance and driving/simulator outcomes.
- Consumption/self-titration measures.
- Means, SD/SE, confidence intervals, effect sizes, correlations and p-values.

Every numerical value must be classified as:
- exact source data;
- calculated;
- digitized from figure;
- approximate visual estimate;
- unavailable.

Never invent missing values.

## Hidden Variables

Potential mechanisms/confounders to track include:

- self-titration;
- inhalation topography;
- tolerance;
- frequency of use;
- expectancy;
- receptor saturation/diminishing response;
- pharmacokinetic/metabolic variability;
- sex and age;
- route;
- CBD;
- timing of sampling;
- assay matrix;
- residual THC;
- task sensitivity;
- learning/practice effects;
- selection bias;
- controlled versus naturalistic design.

Separate demonstrated mechanisms from author interpretations, NGenWay hypotheses, and unknowns.

## Core Gaps to Visualize

1. **Nominal dose vs actual exposure** — users can change consumption behavior.
2. **Exposure vs physiology** — some physiological signals may show clearer dose-response relationships.
3. **Exposure vs subjective high** — subjective response may not scale proportionally with administered dose.
4. **Blood THC vs subjective intoxication** — large blood-level differences can coexist with smaller experiential differences.
5. **Blood THC vs impairment** — biomarkers do not behave like a simple cannabis analogue of alcohol BAC.
6. **Same THC vs different people** — tolerance, use frequency, metabolism, route and timing change relationships.

## Evidence Comparison

| Study | Design | N | Conditions | Main finding |
|---|---|---:|---|---|
| Ramesh 2013 | Within-subject, double-blind | 18 | 0/2/4/6 active puffs | HR ↑ and craving ↓ dose-dependently; high increased vs placebo but not dose-dependently; smoking amount changed |
| Bidwell 2020 | Naturalistic | 121 | Flower 16/24%; concentrate 70/90% | Concentrate blood THC ≫ flower, without proportionately greater subjective or measured impairment |
| McCartney 2021 | Meta-regression | 28 studies / 822 outcomes | Multiple routes/users/biomarkers | THC biomarkers generally weak predictors of impairment |

## Visualization Program

### Exhibit 001 — Dose ≠ High

Interactive **Dose × Time Explorer**.

Controls:
- 0 / 2 / 4 / 6 active puffs;
- minutes after smoking.

Synchronized outputs:
- heart rate;
- subjective high;
- craving;
- cognition/psychomotor performance;
- expired CO / amount smoked.

Discovery: different dimensions follow different dose-response shapes.

### Exhibit 002 — Potency ≠ Impairment

Recurring signal-chain visualization:

**PRODUCT → POTENCY → CONSUMED DOSE → EXPOSURE → BLOOD THC → SUBJECTIVE HIGH → COGNITIVE/MOTOR EFFECT → FUNCTIONAL IMPAIRMENT**

Allow the chain to visually stretch/compress according to the evidence.

Discovery: concentrate users can have substantially greater blood THC without proportionately larger differences in subjective intoxication or measured impairment.

### Exhibit 003 — Blood THC ≠ Cannabis BAC

Visualize meta-analysis data using scatterplots/distributions.

Filters:
- regular vs occasional users;
- inhaled vs oral;
- biomarker;
- outcome category.

Discovery: biomarker → impairment is a noisy relationship rather than a simple threshold.

### Exhibit 004 — Same THC ≠ Same Person

Explore tolerance, frequency of use, metabolism, demographics where supported, route, timing and individual variability.

### Exhibit 005 — Same Product ≠ Same Journey

Compare inhaled versus oral cannabis across time:
administration → onset → blood THC/metabolites → subjective effect → cognitive effect → peak → decline/residual effect.

## Evidence / Certainty System

Every displayed claim should expose:

**Evidence type**
- controlled experiment;
- naturalistic experiment;
- observational;
- systematic review;
- meta-analysis.

**Data provenance**
- exact;
- calculated;
- digitized;
- estimated;
- unavailable.

**Claim status**
- supported;
- mixed;
- speculative;
- unknown.

**Interpretation source**
- measured result;
- statistical result;
- authors’ interpretation;
- NGenWay inference.

Do not reduce all evidence quality to a simplistic single score.

## MVP

Build a polished evidence story containing:

1. Exhibit 001 — Dose ≠ High
2. Exhibit 002 — Potency ≠ Impairment
3. Exhibit 003 — Blood THC ≠ Cannabis BAC

The MVP should already use production-oriented data architecture rather than hard-coded chart values.

Include:
- responsive interactive charts;
- structured JSON/CSV;
- source citations;
- study cards;
- methodology and limitations;
- provenance UI;
- uncertainty;
- exact-vs-digitized distinction;
- accessibility;
- reusable exhibit components.

Do not:
- recommend cannabis doses;
- imply safe-to-drive thresholds;
- equate lack of dose-response with lack of impairment;
- generalize chronic-user findings to everyone;
- hide contradictory evidence.

## Suggested Architecture

```text
/data
  /raw
  /derived
  /digitized
  /normalized

/sources
  studies.json
  bibliography.json

/content
  claims.json
  mechanisms.json
  annotations.json

/exhibits
  exhibit-001/
  exhibit-002/
  exhibit-003/

/docs
  methodology.md
  provenance.md
  limitations.md
  research-notes.md

/scripts
  extraction/
  validation/
  transforms/

/app
  components/
  visualizations/
  pages/
```

Suggested normalized objects:
- studies;
- populations;
- conditions;
- measures;
- observations;
- statistics;
- claims;
- mechanisms;
- citations;
- provenance;
- visualization annotations.

## Data Acquisition

Prefer PubMed, PubMed Central, publisher/DOI pages, supplemental files, author repositories and legitimate institutional repositories.

Where raw numerical data are unavailable, figures may be reproducibly digitized with tools such as WebPlotDigitizer or Engauge. Digitized data should be stored separately from exact source data and include figure number, axes, units, extraction method and uncertainty.

Favor recreating visualizations from legitimately extracted numerical data rather than copying copyrighted published figures.

## Future Research

Seek:
- edible/oral vs inhaled time-course datasets;
- controlled frequent-vs-occasional user studies;
- THC/CBD experiments;
- pharmacokinetic raw data;
- individual participant data;
- driving/simulator datasets;
- tolerance studies;
- metabolites;
- crossover experiments;
- open supplementary datasets.

Longer-term possibilities:
- living evidence updates;
- cross-study harmonization;
- meta-analytic/Bayesian layers;
- individual-variability views;
- public educational mode;
- researcher mode;
- clinician mode;
- policy/forensics mode.

## CLI AI Work Plan

1. Fetch legitimate source PDFs/HTML/supplements.
2. Verify bibliography.
3. Extract tables and exact numeric values.
4. Digitize figures where necessary.
5. Keep exact and digitized data separate.
6. Normalize into CSV/JSON.
7. Build evidence manifest.
8. Validate provenance.
9. Build Exhibit 001.
10. Validate Exhibit 001 against sources.
11. Build Exhibit 002.
12. Validate Exhibit 002.
13. Build Exhibit 003.
14. Add methodology/source/caveat/provenance interfaces.
15. Test accessibility and responsiveness.
16. Preserve architecture for additional studies/exhibits.

## Research Deliverables

A. Executive product thesis  
B. Verified reference library/citation map  
C. Structured study/evidence matrix  
D. Visualization-ready data with provenance and uncertainty  
E. Findings, contradictions and hidden insights  
F. Exhibit catalog and MVP specification  
G. Data/content schemas  
H. Technical architecture/repository blueprint  
I. Safety, interpretation and copyright constraints  
J. Future roadmap/research opportunities  
K. Self-contained CLI AI build handoff

## Final Product Thesis

**The MVP is cannabis evidence visualization.**

The deeper architectural opportunity is an evidence engine for visualizing:

> **the distance between a proxy and the phenomenon it is supposed to represent.**
