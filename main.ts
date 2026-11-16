// ai-excited-01 — entry program.
//
// What the judge sees: a great white shark tearing out of a living-room
// aquarium, jaws gaping, bearing down on a dolphin that leapt clear a
// split second earlier. Shards of glass and a crown of spray hang in the
// air; three tiny people run for cover, and their smallness is what sells
// the shark's size. Nothing is written inside the picture.
//
// The picture itself is not drawn here. It was made once, checked, and
// stored in this repo as entry.png. This program's only job is to place
// that exact file where the grader looks for it, and to prove — with a
// hash, not a hope — that the delivered copy is identical, byte for byte.
// There is no network, no clock, no dice: two runs produce the same file.
//
// Needs Node 22 and nothing else. Try it locally with:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const imagePath = fileURLToPath(new URL('./entry.png', import.meta.url));
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetPath = `${targetDir}/entry.png`;

function fingerprint(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function deliver() {
  const payload = await readFile(imagePath).catch(() => {
    throw new Error(`entry image missing next to this program: ${imagePath}`);
  });
  if (payload.byteLength === 0) {
    throw new Error('entry.png is empty — refusing to deliver an empty image');
  }
  if (payload[0] !== 0xff || payload[1] !== 0xd8 || payload[2] !== 0xff) {
    throw new Error('entry.png does not start with JPEG magic bytes — refusing to deliver it');
  }

  const sourceHash = fingerprint(payload);

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetPath, payload);

  const delivered = await readFile(targetPath);
  const deliveredHash = fingerprint(delivered);

  if (delivered.byteLength !== payload.byteLength || deliveredHash !== sourceHash) {
    throw new Error(
      `delivered copy failed verification (sha256 ${deliveredHash}, expected ${sourceHash})`,
    );
  }

  console.log(`delivered entry.png (${delivered.byteLength} bytes, sha256 ${deliveredHash})`);
}

await deliver();
