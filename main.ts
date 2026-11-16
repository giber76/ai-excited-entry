// ai-excited-01 — "Make the AI judge excited".
// The entry image: a giant great white shark bursting out of a shattered
// home aquarium in a sunny living room, jaws open, chasing a dolphin that
// leaps just ahead of it. Water and broken glass explode outward; three
// tiny panicking people give the scene its scale. No text in the image.
//
// This program does exactly one thing: it copies the finished image
// (entry.png, sitting next to this file) into the output directory the
// grader reads. Nothing is generated while it runs, nothing is fetched,
// nothing is random — so the grader's two runs write byte-identical files.
//
// Node 22, standard library only.
//
// Run locally: MAKEFUN_OUTPUT_DIR=out node main.ts

import fs from 'node:fs';
import path from 'node:path';

const sourceDir = new URL('.', import.meta.url).pathname;
const targetDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const sourceFile = path.join(sourceDir, 'entry.png');
const targetFile = path.join(targetDir, 'entry.png');

if (!fs.existsSync(sourceFile)) {
  throw new Error(`entry.png not found next to main.ts (${sourceFile})`);
}

const image = fs.readFileSync(sourceFile);
if (image.length === 0) {
  throw new Error('entry.png is empty — refusing to write an empty output image');
}

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(targetFile, image);

// Read back what was written and confirm it is the same image: a
// truncated or partial write must fail loudly here, never silently pass
// through to the grader.
const written = fs.readFileSync(targetFile);
if (written.length !== image.length || !written.equals(image)) {
  throw new Error('output verification failed — written entry.png differs from the source image');
}
