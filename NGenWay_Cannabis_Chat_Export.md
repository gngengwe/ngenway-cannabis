# NGenWay Cannabis — Chat Export

Exported September 13, 2026.

> This export preserves the substantive conversation available in the current chat context. Interactive UI prototypes are represented by their substantive content and design decisions rather than internal rendering code.

---

## User

Go

## Assistant

I’m turning **Exhibit 001: Dose vs. Experience** into a compact interactive prototype: one slider, four response tracks, and the paper’s central “dose keeps rising / experience partly plateaus” insight.

I’d make the **first NGenWay Cannabis prototype deliberately qualitative**—faithful to what the experiment establishes without inventing numerical values the published figures would be needed to extract. The study’s unusual structure is the feature: 0/2/4/6 active puffs, while every session still contained six total puffs; heart rate rose and craving fell dose-dependently, subjective “high” rose with active cannabis but did **not** significantly separate across the active-dose conditions, and smoking behavior changed as potency increased.

### Exhibit 001 — Dose vs. Experience

**The dose kept changing. The high didn't.**

The interactive concept used 0, 2, 4, and 6 active THC puffs and four synchronized tracks:

- **BODY — Heart rate:** dose-dependent increase.
- **EXPERIENCE — “High”:** jump from placebo to active cannabis, then approximate plateau.
- **WANT — Craving:** dose-dependent decrease.
- **BEHAVIOR — Smoke intake:** evidence of reduced inhalation as active cannabis increased.

**What you'd expect:** Dose ↑ → everything ↑.

**What appeared:** different dimensions of response followed different shapes.

The hidden-variable layer emphasized that expired CO and cigarette-weight data suggested participants inhaled less smoke as active marijuana increased. Self-titration may therefore have compressed effective differences among the active-dose conditions. Expectancy and tolerance in experienced daily smokers were also possible contributors.

The important design decision is that the bars encode **shapes, not fake measurements**. V2 should extract actual plotted means/SEMs from Figures 1–5 and add **time after smoking**, allowing discovery of both dose-response and time-response.

---

## User

Go

## Assistant

I’m taking the prototype one level deeper: **actual figure-derived study values + time after smoking**, so the visualization becomes evidence-backed rather than qualitative.

I’m upgrading it into **Exhibit 001 V2**: dose + time become independent dimensions, and I’m separating **reported statistical findings** from **graph-read approximate values** so we don’t create false precision.

### Exhibit 001 V2 — Dose × Time

Controls:

- Active THC puffs: 0 / 2 / 4 / 6.
- Minutes after smoking: 15 / 30 / 60 / 90 / 120 / 180 / 210.

The prototype displays an approximate graph-read time course for **“I feel high”**, explicitly identified as an estimate from the published figure rather than participant-level source data.

Three evidence tracks remain visible:

- **Experience:** active cannabis separates from placebo, but 2 vs. 4 vs. 6 active puffs do not show a systematic dose-response.
- **Body:** heart rate increases dose-dependently.
- **Want:** desire for marijuana decreases with dose.

### The Gap

**What went in → What was felt**

At 2 active puffs: a small active dose produces a large subjective jump from placebo.

At 4 active puffs: twice as many active puffs do not produce twice the reported high.

At 6 active puffs: the nominal dose keeps rising, while reported intoxication stays in roughly the same subjective band.

Hidden mechanisms:

**Self-titration.** Expired CO and cigarette-weight data indicate participants inhaled less as active marijuana increased. Nominal dose therefore changed more than the amount actually inhaled.

**Expectancy + tolerance.** Experienced daily smokers may be less sensitive to subtle subjective differences, while cannabis cues and expectations could make active conditions feel more alike.

### NGenWay compression

**Exposure ↑ → physiology ↑ · craving ↓ · subjective high ≈ plateau**

The interesting object isn't cannabis itself. It's the gap between **dose**, **exposure**, **body**, and **experience**.

This surfaced a broader causal chain:

**administered dose → inhaled exposure → physiological response → perceived experience**

The experiment manipulated the first, participants partly changed the second themselves, the third still tracked dose, and the fourth largely stopped distinguishing active-dose conditions.

The proposed next exhibit was to attack the same gap with a modern dataset: **THC potency/concentration versus blood THC versus subjective intoxication versus cognitive impairment.**

---

## User

Go

## Assistant

I’m building **Exhibit 002** around the four-part chain we just surfaced: **product potency → blood THC → subjective intoxication → impairment**. The goal is to see where those measures track—and where they decouple.

The modern study gives us exactly the contrast we wanted: **concentrates produced ~2.3× the mean plasma THC of flower (0.32 vs 0.14 μg/mL), yet subjective intoxication and short-term impairment did not rise in parallel.**

### Exhibit 002 — Potency ≠ Impairment

Four legal-market product conditions:

- 16% THC flower
- 24% THC flower
- 70% THC concentrate
- 90% THC concentrate

Signal chain:

**01 Product → 02 Blood → 03 Felt → 04 Performed**

Core finding:

**Potency ≠ exposure ≠ intoxication ≠ impairment**

Immediately after use, concentrate users averaged about **0.32 μg/mL plasma THC** versus about **0.14 μg/mL** among flower users—roughly **2.3×** as high.

Yet concentrate users did not show correspondingly greater subjective intoxication or short-term cognitive/balance impairment despite substantially higher THC exposure.

The prototype intentionally did **not** invent separate plasma values for 16% vs. 24% flower or 70% vs. 90% concentrate because the published findings did not support that granularity.

### The Gap

**90% on the label does not mean “90% impaired.”**

Product potency is one signal. Blood concentration is another. Subjective intoxication is another. Functional impairment is another. They are related—but not interchangeable measurements.

Possible explanations surfaced:

- **Self-titration:** users may consume less material as potency rises.
- **Tolerance:** regular concentrate users may tolerate higher circulating THC.
- **Response ceiling:** receptor saturation or diminishing effects may contribute.

### NGenWay rule emerging

**Never collapse the proxy into the thing it is trying to measure.**

**Potency ≠ Dose consumed ≠ Blood THC ≠ Feeling high ≠ Impairment**

The conclusion is not “high-potency cannabis doesn't impair you.” Memory and balance were affected by acute cannabis use. The more interesting finding is that **the magnitude of impairment was not simply readable from product potency or blood THC concentration.**

A later meta-regression across 28 publications and 822 driving-related outcomes found blood THC to be only a weak predictor of driving-related impairment; subjective intoxication was also only weakly associated.

This produced a broader thesis:

> **Cannabis produces multiple signals that humans routinely collapse into one another. Visualization can pull them apart.**

Proposed exhibit sequence:

**001 — Dose ≠ High**  
Controlled puffs; subjective response plateaus.

**002 — Potency ≠ Impairment**  
Legal-market flower vs. concentrates; blood THC separates far more than experience/performance.

**003 — Blood THC ≠ “BAC for Cannabis”**  
Visualize why a single THC number poorly represents functional impairment.

**004 — Same THC ≠ Same Person**  
Tolerance, frequency of use, route, metabolism, timing.

**005 — Same Product ≠ Same Journey**  
Inhaled vs. edible: onset, peak, duration, metabolites, experience.

This suggested an even broader NGenWay genre:

### **Things we measure as though they were the same thing.**

Cannabis may simply be an unusually rich first subject. As with *The Gap*, **the interesting information lives in the distance between the proxy and the phenomenon.**

---

## User

What if my goal is do a @Deep research to gather data to visualize the references, the findings, and hidden insights and future possibilities and pass to CLI AI to building more than an MVP but start there, can you generate a prompt and then I can do a handoff

## Assistant

A Deep Research job was launched with the following research brief.

# NGenWay Cannabis — Deep Research Prompt

## Goal

Create a rigorous evidence/data foundation that can be handed off to a CLI coding AI to build an evidence-first interactive visualization product, starting with an MVP but architected to grow substantially beyond it.

The product should help users see gaps between cannabis-related proxies and actual phenomena—for example:

**product THC potency ≠ dose consumed ≠ systemic exposure/blood THC ≠ subjective intoxication ≠ cognitive/psychomotor impairment ≠ driving impairment**

The research should reveal counterintuitive findings, hidden variables, uncertainty, contradictions, and research gaps.

## Anchor references

Begin from these references and follow their citation networks forward and backward:

1. Ramesh D, Haney M, Cooper ZD. *Marijuana’s Dose-Dependent Effects in Daily Marijuana Smokers.* Experimental and Clinical Psychopharmacology. 2013;21(4):287–293. PMID 23937597 / PMC4547548.
2. The 2020 JAMA Psychiatry naturalistic study comparing flower (16%/24% THC) and concentrates (70%/90% THC), including plasma THC, subjective intoxication, cognitive performance, and balance outcomes.
3. The 2021/2022 systematic review/meta-regression on blood THC, subjective intoxication, and driving-related impairment in Neuroscience & Biobehavioral Reviews, DOI 10.1016/j.neubiorev.2021.11.004.

Verify all bibliographic details.

## Research objectives

1. Build a verified bibliography and citation graph. Identify foundational, replication, contradictory, follow-up, systematic review/meta-analysis, pharmacokinetic, impairment/driving, tolerance, self-titration, route-of-administration, edible-vs-inhaled, THC/CBD interaction, sex/age/frequency-of-use, and measurement-validity studies. Prioritize peer-reviewed primary research, systematic reviews/meta-analyses, and authoritative scientific/public-health sources. Include DOI/PMID/PMC and legitimate open-access links where available.

2. Extract visualization-ready data from each high-value paper. Capture study design, N, participant characteristics, cannabis-use frequency/tolerance, product/formulation, THC/CBD concentrations, administered/consumed dose, route, puff/topography data, timepoints, plasma/whole-blood THC and metabolites, subjective VAS measures, cognition/psychomotor measures, balance, driving/simulator outcomes, effect estimates, confidence intervals/error bars, significance, and relevant table/figure values. Clearly distinguish exact source data from values digitized or estimated from figures. Never invent missing values. Record units and definitions.

3. Preserve provenance at the smallest useful level for every extracted finding: source, table/figure/page/section, variable definition, sample, condition, timepoint, units, uncertainty, and whether the value is exact, calculated, or graph-digitized. Produce a data dictionary and normalized schema suitable for JSON/CSV/SQLite/Postgres.

4. Identify **gaps worth visualizing** where commonly conflated measures diverge, including:
   - labeled potency vs. consumed dose;
   - nominal dose vs. inhaled dose due to self-titration;
   - inhaled dose vs. plasma THC;
   - plasma THC vs. subjective high;
   - subjective high vs. cognitive/psychomotor impairment;
   - blood THC vs. driving impairment;
   - frequent vs. occasional users;
   - inhaled vs. edible onset/peak/duration;
   - THC vs. metabolites;
   - individual variability.

   Quantify divergences where evidence permits.

5. Identify hidden mechanisms/confounders: tolerance, self-titration, inhalation topography, expectancy, receptor saturation/diminishing response, pharmacokinetic variability, body composition, sex, age, use frequency, route, CBD, sampling time, assay matrix, residual THC in frequent users, learning/practice effects, task sensitivity, selection bias, naturalistic vs. controlled designs, etc. Separate demonstrated mechanisms from author hypotheses and our own plausible hypotheses.

6. Search specifically for evidence challenging the emerging narrative. Identify studies where potency, blood THC, subjective intoxication, and/or impairment **do** track strongly, contexts where relationships become more predictive, and limitations that could make a visualization misleading. Treat contradiction as a product feature, not noise.

7. Develop an evidence taxonomy and confidence system suitable for UI: controlled experiment vs. naturalistic vs. observational vs. meta-analysis; sample size; replication; population generalizability; exact vs. digitized data; convergent vs. conflicting evidence. Do not collapse evidence quality into a simplistic single score unless justified.

8. Propose evidence-backed interactive exhibits. At minimum evaluate:
   - Exhibit 001 — Dose ≠ High
   - Exhibit 002 — Potency ≠ Impairment
   - Exhibit 003 — Blood THC ≠ Cannabis BAC
   - Exhibit 004 — Same THC ≠ Same Person
   - Exhibit 005 — Same Product ≠ Same Journey

   For each, specify research question, strongest datasets, variables, visual encoding, interaction model, annotations, caveats, and the insight the user should discover. Add better exhibit ideas discovered through research.

9. Explore visualization precedents beyond cannabis: Gapminder/Hans Rosling-style exploratory storytelling, Our World in Data, interactive scientific explainers, uncertainty visualization, causal-chain visualization, pharmacokinetic curves, small multiples, connected scatterplots, slopegraphs, Sankey/flow only where analytically justified, and other projects exposing differences between proxies and underlying phenomena. Explain transferable design principles without copying aesthetics.

10. Define MVP vs. post-MVP. The MVP should be small enough for a CLI AI to build while using a data/content architecture that supports dozens or hundreds of studies later. Recommend exact MVP exhibits, datasets, interactions, responsive behavior, accessibility, citations/provenance UX, uncertainty representation, methodology panel, and safeguards against implying personalized dosing or safe-to-drive thresholds. Define V1/V2 expansion paths.

11. Produce implementation-ready guidance for a coding-agent handoff: information architecture; component model; normalized data schema with examples; content schema for claims/caveats/annotations; citation/provenance model; filtering dimensions; visualization requirements; recommended web stack and visualization libraries with rationale; static-data vs. backend tradeoffs; tests/data validation; accessibility; performance; reproducibility; repository/file structure. Prefer maintainable open standards and avoid unnecessary complexity.

12. Identify datasets/APIs/repositories that can legally and practically support the product. Note licensing, reuse restrictions, attribution requirements, update cadence, access method, and whether redistribution of extracted study data is permitted or uncertain. Flag copyright issues around reproducing figures; favor recreating visualizations from legitimately extracted numerical data rather than copying published figures.

13. Include research gaps and future possibilities: datasets or experiments that would improve the product; living evidence updates; cross-study harmonization; Bayesian/meta-analytic layers; individual variability visualization; educational modes; clinician/researcher modes; policy/forensics implications; and extensions of the NGenWay concept to other domains where proxies are mistaken for outcomes.

## Deliverables

Optimize the result for subsequent handoff to a CLI AI coding agent rather than merely an academic literature review.

Produce:

A. Executive product thesis  
B. Verified reference library/citation map  
C. Structured study/evidence matrix  
D. Visualization-ready data tables with provenance and uncertainty  
E. Key findings + contradictions + hidden insights  
F. Proposed exhibit catalog and detailed MVP specification  
G. Data/content schemas  
H. Technical architecture and repository blueprint  
I. Safety/interpretation/copyright constraints  
J. Future roadmap and research opportunities  
K. Final self-contained **CLI AI BUILD HANDOFF PROMPT**

The final handoff prompt must incorporate the research findings, exact MVP requirements, schemas, source/provenance rules, visual principles, acceptance criteria, and phased implementation instructions. It should instruct the coding agent to build the MVP first while preserving architecture for the larger product.

Explicitly label claims as **supported, mixed, speculative, or unknown**, and distinguish source data from derived/digitized values throughout.

---

## Deep Research Result Available in This Chat

The resulting research-to-prototype plan identified three initial evidence anchors.

### Ramesh et al. 2013

Within-subject, double-blind study of 18 daily smokers using 0, 2, 4, or 6 active puffs. Active marijuana dose-dependently increased heart rate and decreased craving, while subjective “high” increased relative to placebo but did not exhibit the same active-dose gradient. Smoking behavior suggested self-titration.

### Bidwell et al. 2020

Naturalistic study of 121 regular cannabis users comparing flower and concentrates. Concentrate users had substantially higher plasma THC than flower users while subjective intoxication and most measured neurobehavioral outcomes did not separate proportionately. Delayed verbal memory and balance were impaired after use.

### McCartney et al. 2021

Meta-regression of 28 studies / 822 outcomes examining THC biomarkers, subjective intoxication, and impairment. Biomarker-performance relationships were generally weak and differed by user frequency and route, supporting caution against treating blood THC as a direct analogue of alcohol BAC.

### Research-to-prototype thesis

**Product potency → consumed/inhaled dose → systemic exposure → subjective experience → functional impairment**

Each arrow is an empirical relationship to investigate rather than an equivalence to assume.

The research plan proposed:

- structured study/evidence manifests;
- study-comparison tables;
- source-level provenance;
- figure digitization where numerical source data are unavailable;
- Dose × Time explorers;
- signal-chain visualizations;
- small multiples;
- causal-chain diagrams;
- CSV/JSON normalized data;
- reproducible extraction methods;
- visualization specs;
- and a CLI-oriented repository architecture.

---

## User

export this entire chat to .md file

## Assistant

A transcript export was initiated.

---

## User

export this entire chat to .md file
