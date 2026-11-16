// Entry program for the ai-excited-01 bounty.
//
// The picture: a huge great white shark smashing out of a living-room
// aquarium, jaws wide open, hot on the tail of a dolphin that jumped
// clear a heartbeat earlier. Glass shards and spray fly in every
// direction, and three tiny people scramble for cover — their size is
// what makes the shark look enormous. There is no writing anywhere in
// the picture itself.
//
// The finished picture already lives in this repo as entry.png. This
// file does not draw anything: it simply hands that exact file to the
// grader, then reads both copies back and compares them byte for byte.
// No network, no randomness, no timestamps anywhere, so the grader's
// two runs write identical files.
//
// Runs on Node 22 with only the standard library. To try it locally:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The folder this file lives in — entry.png sits right beside it.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');

// Where the grader wants the image. MAKEFUN_OUTPUT_DIR wins when set,
// otherwise the conventional /output location is used.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const destination = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`cannot find the entry image next to this file: ${source}`);
}

const original = readFileSync(source);
if (original.length === 0) {
  throw new Error('entry.png is empty — refusing to deliver an empty image');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, destination);

const delivered = readFileSync(destination);

// A truncated or partial copy must fail loudly here, never silently
// pass a broken image through to the grader.
assertIdentical(delivered, original);

// Two buffers hold the same bytes only when they agree on length and
// on every single byte.
function assertIdentical(first, second) {
  if (first.length !== second.length || !first.equals(second)) {
    throw new Error('delivered entry.png does not match the source image byte for byte');
  }
}
