// Copies the canonical evidence data (owned by the repo root's /sources, /content,
// /data directories) into public/data/ so the app can fetch it at runtime as static
// assets. This is regenerated on every dev/build (see package.json predev/prebuild) --
// public/data/ is NOT the source of truth and is gitignored.

import { mkdirSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(appRoot, "..");
const outRoot = join(appRoot, "public", "data");

const files = [
  "sources/studies.json",
  "content/claims.json",
  "content/mechanisms.json",
  "data/digitized/ramesh-2013/figure2-vas.estimated.json",
  "data/digitized/ramesh-2013/figure3-craving.estimated.json",
  "data/digitized/ramesh-2013/figure4-hr-co.estimated.json",
  "data/raw/bidwell-2020/table2-outcomes.json",
];

for (const relPath of files) {
  const src = join(repoRoot, relPath);
  const dest = join(outRoot, relPath);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
}

console.log(`Synced ${files.length} data files into public/data/`);
