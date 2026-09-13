// Validates sources/studies.json, content/claims.json, content/mechanisms.json against
// /schema/*.schema.json, and cross-checks referential integrity (claim.study_id exists,
// mechanism.supporting_claims exist, claim.mechanism_link exists). Exits non-zero on any
// failure so this can run in CI before deploy.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const readJSON = (p) => JSON.parse(readFileSync(path.join(root, p), "utf8"));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const studySchema = readJSON("schema/study.schema.json");
const claimSchema = readJSON("schema/claim.schema.json");
const mechanismSchema = readJSON("schema/mechanism.schema.json");

const validateStudy = ajv.compile(studySchema);
const validateClaim = ajv.compile(claimSchema);
const validateMechanism = ajv.compile(mechanismSchema);

const studies = readJSON("sources/studies.json");
const claims = readJSON("content/claims.json");
const mechanisms = readJSON("content/mechanisms.json");

let errors = 0;

function report(label, ok, err) {
  if (!ok) {
    errors++;
    console.error(`FAIL  ${label}`);
    if (err) console.error("      " + JSON.stringify(err));
  }
}

for (const [id, study] of Object.entries(studies)) {
  const ok = validateStudy(study);
  report(`study "${id}" schema`, ok, validateStudy.errors);
  if (id !== study.id) report(`study "${id}" key matches its own id field`, false);
}

const studyIds = new Set(Object.keys(studies));
const claimIds = new Set(claims.map((c) => c.id));

for (const claim of claims) {
  const ok = validateClaim(claim);
  report(`claim "${claim.id}" schema`, ok, validateClaim.errors);
  report(
    `claim "${claim.id}" references known study_id "${claim.study_id}"`,
    studyIds.has(claim.study_id)
  );
  if (claim.mechanism_link) {
    report(
      `claim "${claim.id}" mechanism_link "${claim.mechanism_link}" will be checked against mechanisms below`,
      true
    );
  }
  // The core rule of this project: never leave a numeric-bearing claim without a stated
  // provenance for both its direction and its magnitude.
  report(
    `claim "${claim.id}" has direction_provenance`,
    Boolean(claim.direction_provenance)
  );
  report(
    `claim "${claim.id}" has magnitude_provenance`,
    Boolean(claim.magnitude_provenance)
  );
}

const mechanismIds = new Set(mechanisms.map((m) => m.id));
for (const mech of mechanisms) {
  const ok = validateMechanism(mech);
  report(`mechanism "${mech.id}" schema`, ok, validateMechanism.errors);
  report(
    `mechanism "${mech.id}" references known study_id "${mech.study_id}"`,
    studyIds.has(mech.study_id)
  );
  for (const cid of mech.supporting_claims ?? []) {
    report(
      `mechanism "${mech.id}" supporting_claims references known claim "${cid}"`,
      claimIds.has(cid)
    );
  }
}

for (const claim of claims) {
  if (claim.mechanism_link) {
    report(
      `claim "${claim.id}" mechanism_link "${claim.mechanism_link}" exists`,
      mechanismIds.has(claim.mechanism_link)
    );
  }
}

if (errors > 0) {
  console.error(`\n${errors} validation error(s).`);
  process.exit(1);
} else {
  console.log(
    `OK: ${Object.keys(studies).length} studies, ${claims.length} claims, ${mechanisms.length} mechanisms validated.`
  );
}
