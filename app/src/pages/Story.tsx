import type { CSSProperties, ReactNode } from "react";
import { useEvidenceData } from "../lib/useEvidenceData";
import { Reveal } from "../components/Reveal";
import { CountUp } from "../components/CountUp";
import { ChapterLink } from "../components/ChapterLink";
import { Figure } from "../components/Figure";

const sectionStyle: CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "72px 20px",
};

export function Story() {
  const state = useEvidenceData();
  if (state.status === "loading") {
    return <p style={{ padding: 24, color: "var(--text-muted)" }}>Loading…</p>;
  }
  if (state.status === "error") {
    return <p style={{ padding: 24, color: "var(--status-warning)" }}>Could not load evidence data: {state.error}</p>;
  }
  const { data } = state;
  const corpus = data.studies["mccartney-2021"] as unknown as { n_publications: number; n_participants: number };

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          minHeight: "72vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 20px",
          background: "radial-gradient(ellipse at 50% -10%, var(--surface-2), var(--page) 60%)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 18 }}>
              NGenWay Cannabis
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", lineHeight: 1.15, margin: "0 0 22px", fontWeight: 700 }}>
              In 2013, researchers tripled how much active cannabis people smoked.
              <br />
              Their heart rate climbed on cue. Their high barely moved.
            </h1>
          </Reveal>
          <Reveal delayMs={160}>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
              This site is about that gap — the distance between what we measure about
              cannabis and what we actually mean when we talk about it.
            </p>
          </Reveal>
          <Reveal delayMs={220}>
            <div style={{ display: "flex", justifyContent: "center", margin: "36px 0 8px" }}>
              <Figure
                src="/assets/hero-signal-chain.svg"
                alt="Five measured cannabis signals -- potency, dose, blood, feeling, impairment -- drawn as separate traces with visible gaps between them"
                maxWidth={720}
                aspectRatio="1200 / 560"
                eager
                hideOnNarrow
              />
            </div>
          </Reveal>
          <Reveal delayMs={300}>
            <p style={{ marginTop: 10, fontSize: 13, color: "var(--text-muted)" }}>↓ scroll</p>
          </Reveal>
        </div>
      </section>

      {/* ACT 1 — the scientific problem */}
      <section style={{ ...sectionStyle, borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
            Act one
          </p>
          <h2 style={{ fontSize: 28, margin: "0 0 16px" }}>Cannabis research has a dose-response problem</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)" }}>
            For decades, giving someone more THC hasn't reliably produced a bigger effect in the
            lab — for reasons that turn out to be as interesting as the drug itself: people
            unconsciously smoke less as potency rises, expectation shapes how "high" feels
            independent of the actual dose, and heavy users build tolerance that flattens subtle
            differences. Three studies, each targeting a different piece of this puzzle, anchor
            everything on this site.
          </p>
        </Reveal>

        <Reveal delayMs={40}>
          <div style={{ display: "flex", justifyContent: "center", margin: "28px 0" }}>
            <Figure
              src="/assets/hero-dose-dial.svg"
              alt=""
              caption="Illustration: a larger nominal dose does not guarantee a larger measured effect."
              maxWidth={480}
              aspectRatio="900 / 500"
            />
          </div>
        </Reveal>

        <div style={{ display: "grid", gap: 16, marginTop: 8 }}>
          <Reveal delayMs={0}>
            <PaperCard
              year="2013"
              title="Ramesh, Haney & Cooper"
              problem="Could a tightly controlled smoking procedure finally produce a clean dose-response curve?"
              solution='Partly. Heart rate and craving tracked dose precisely — "high" separated from placebo once, then stopped moving.'
            />
          </Reveal>
          <Reveal delayMs={80}>
            <PaperCard
              year="2020"
              title="Bidwell et al., JAMA Psychiatry"
              problem="Legal-market concentrates now reach 90% THC. Does real-world potency track real-world impairment?"
              solution="No. Concentrate users' blood THC ran far higher than flower users' — their intoxication and performance largely didn't follow."
            />
          </Reveal>
          <Reveal delayMs={160}>
            <PaperCard
              year="2021/2022"
              title="McCartney et al., meta-regression"
              problem="Does blood THC work as a 'breathalyzer number' the way blood alcohol does?"
              solution="Pooling 28 studies: weakly, in occasional users. Not at all in regular ones."
            />
          </Reveal>
        </div>
      </section>

      {/* ACT 2 — the website's own problem */}
      <section style={{ ...sectionStyle, background: "var(--surface-1)", borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
            Act two
          </p>
          <h2 style={{ fontSize: 28, margin: "0 0 16px" }}>Even solid data gets flattened into one story</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 24 }}>
            Outside the lab, potency, dose, blood concentration, feeling high, and impairment get
            talked about as if they're the same fact wearing different names — a bigger number
            anywhere implies a bigger number everywhere else. The studies above say otherwise.
          </p>
        </Reveal>
        <Reveal delayMs={120}>
          <p
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.5,
              fontWeight: 600,
              margin: "0 0 24px",
              color: "var(--text-primary)",
            }}
          >
            Potency <Gap /> Dose consumed <Gap /> Blood concentration <Gap /> Feeling high <Gap />{" "}
            Impairment.
          </p>
        </Reveal>
        <Reveal delayMs={200}>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)" }}>
            This site doesn't argue that cannabis is safe or dangerous. It visualizes the actual
            measured distance between each pair of those signals, with every number traced back
            to where it came from — so you can see exactly where the chain holds and where it
            breaks, instead of assuming it's one chain at all.
          </p>
        </Reveal>
      </section>

      {/* ACT 3 — the narrative walk into the exhibits */}
      <section style={{ ...sectionStyle, borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
            Act three
          </p>
          <h2 style={{ fontSize: 28, margin: "0 0 8px" }}>Follow the chain</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 8 }}>
            Three chapters, three anchor studies, each picking up where the last one's gap opened.
          </p>
        </Reveal>

        <Reveal delayMs={0}>
          <Chapter
            index="01"
            title="Potency doesn't equal dose"
            body={
              <>
                Researchers controlled the exact number of active puffs — 0, 2, 4, or 6. Heart
                rate and craving tracked that dose precisely, step by step. Self-reported "high"
                jumped once, from placebo to any active dose, then stopped moving no matter how
                much higher the dose climbed. Part of the reason: participants measurably inhaled
                less as the active dose rose — the nominal dose kept climbing, but what actually
                reached the body climbed less.
              </>
            }
            cta={<ChapterLink to="/exhibits/001">Explore Exhibit 001 — Dose ≠ High</ChapterLink>}
          />
        </Reveal>

        <Reveal delayMs={0}>
          <Chapter
            index="02"
            title="Dose doesn't equal blood, blood doesn't equal feeling"
            body={
              <>
                In a real legal market, concentrate users (70–90% THC) reached roughly 2.3 times
                the blood THC of flower users (16–24% THC) after use. Despite that gap, their
                peak subjective intoxication was not significantly different — and on two other
                measures, verbal recall and balance, concentrate users' scores moved{" "}
                <em>less</em> than flower users', not more.
              </>
            }
            cta={<ChapterLink to="/exhibits/002">Explore Exhibit 002 — Potency ≠ Impairment</ChapterLink>}
          />
        </Reveal>

        <Reveal delayMs={0}>
          <Chapter
            index="03"
            title="Blood doesn't equal impairment"
            body={
              <>
                Pooling <CountUp to={corpus.n_publications} /> publications and{" "}
                <CountUp to={corpus.n_participants} /> participants, the relationship between
                blood THC and measured impairment was real but weak in occasional users — and
                statistically invisible in regular ones. That null result rests on a smaller,
                less robust sample, so it means "no relationship detected with the available
                data," not proof there's truly none.
              </>
            }
            cta={<ChapterLink to="/exhibits/003">Explore Exhibit 003 — Blood THC ≠ Cannabis BAC</ChapterLink>}
          />
        </Reveal>
      </section>

      <section style={{ ...sectionStyle, textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <p style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>
            Things we measure as though they were the same thing.
          </p>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Not medical, dosing, or legal advice — see each exhibit's methodology panel for
            sources and limits.
          </p>
        </Reveal>
      </section>
    </div>
  );
}

function Gap() {
  // The marker is doing the work of "≠" inline in a sentence -- meaningful content,
  // not decoration, so it needs real alt text rather than aria-hidden/empty alt.
  return (
    <img
      src="/assets/ui-gap-marker.svg"
      alt="does not equal"
      style={{ height: "0.7em", width: "auto", verticalAlign: "middle", margin: "0 6px" }}
    />
  );
}

function PaperCard({ year, title, problem, solution }: { year: string; title: string; problem: string; solution: string }) {
  return (
    <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>{year}</p>
      <h3 style={{ margin: "2px 0 10px", fontSize: 16 }}>{title}</h3>
      <p style={{ margin: "0 0 8px", fontSize: 13.5, color: "var(--text-secondary)" }}>
        <strong style={{ color: "var(--text-primary)" }}>Problem: </strong>
        {problem}
      </p>
      <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-secondary)" }}>
        <strong style={{ color: "var(--text-primary)" }}>Found: </strong>
        {solution}
      </p>
    </div>
  );
}

function Chapter({
  index,
  title,
  body,
  cta,
}: {
  index: string;
  title: string;
  body: ReactNode;
  cta: ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 20, padding: "28px 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600, minWidth: 28 }}>{index}</div>
      <div>
        <h3 style={{ margin: "0 0 8px", fontSize: 19 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" }}>{body}</p>
        {cta}
      </div>
    </div>
  );
}
