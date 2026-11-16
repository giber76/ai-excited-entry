// ai-excited-01 entry: "Kapan aku makan?" — a giant crocodile bursting out of
// a coffee cup in a cozy cafe, taunting the judge. The image lives beside
// this file as entry.png; the program writes those exact bytes to the output
// directory, so the judge sees them and nothing else.
// Node 22, standard library only. No network, no randomness: both runs
// must produce byte-identical output.
//
// Run locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

// Determinism is a hard requirement: both grader runs must write
// byte-identical output, so nothing here may depend on time, randomness,
// or the machine it runs on — the file is copied verbatim, nothing more.
const pngPath = join(here, 'entry.png');
let bytes: Buffer;
try {
  bytes = readFileSync(pngPath);
} catch {
  throw new Error(`entry.png is missing — expected it beside main.ts at ${pngPath}`);
}
if (bytes.length === 0) {
  throw new Error('entry.png is empty — refusing to write a zero-byte output image');
}
writeFileSync(join(outDir, 'entry.png'), bytes);
