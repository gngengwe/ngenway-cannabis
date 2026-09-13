import { useEffect, useState } from "react";
import type {
  BidwellTable2,
  Claim,
  Figure3CravingEstimate,
  Figure4HrCoEstimate,
  Figure2VasEstimate,
  Mechanism,
  StudiesById,
} from "./types";

export interface EvidenceData {
  studies: StudiesById;
  claims: Claim[];
  mechanisms: Mechanism[];
  ramesh2013: {
    vas: Figure2VasEstimate;
    craving: Figure3CravingEstimate;
    hrCo: Figure4HrCoEstimate;
  };
  bidwell2020: {
    table2: BidwellTable2;
  };
}

type LoadState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: EvidenceData };

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Both the resolved data AND the in-flight promise are cached at module scope: all 3
// exhibits mount at once (kept alive under `hidden` per the ARIA tabpanel pattern in
// App.tsx) and call this on first paint, before any fetch has resolved -- without also
// caching the promise, each would independently re-fire all 6 requests.
let cached: EvidenceData | null = null;
let inFlight: Promise<EvidenceData> | null = null;

function loadEvidenceData(): Promise<EvidenceData> {
  if (cached) return Promise.resolve(cached);
  if (inFlight) return inFlight;
  inFlight = fetchEvidenceData().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

async function fetchEvidenceData(): Promise<EvidenceData> {
  const [studies, claims, mechanisms, vas, craving, hrCo, bidwellTable2] = await Promise.all([
    fetchJson<StudiesById>("/data/sources/studies.json"),
    fetchJson<Claim[]>("/data/content/claims.json"),
    fetchJson<Mechanism[]>("/data/content/mechanisms.json"),
    fetchJson<Figure2VasEstimate>("/data/data/digitized/ramesh-2013/figure2-vas.estimated.json"),
    fetchJson<Figure3CravingEstimate>(
      "/data/data/digitized/ramesh-2013/figure3-craving.estimated.json",
    ),
    fetchJson<Figure4HrCoEstimate>("/data/data/digitized/ramesh-2013/figure4-hr-co.estimated.json"),
    fetchJson<BidwellTable2>("/data/data/raw/bidwell-2020/table2-outcomes.json"),
  ]);

  cached = {
    studies,
    claims,
    mechanisms,
    ramesh2013: { vas, craving, hrCo },
    bidwell2020: { table2: bidwellTable2 },
  };
  return cached;
}

/** Loads the evidence data once (module-level cache) and exposes it as React state. */
export function useEvidenceData(): LoadState {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    loadEvidenceData()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            error: err instanceof Error ? err.message : String(err),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function findClaim(claims: Claim[], id: string): Claim | undefined {
  return claims.find((c) => c.id === id);
}
