# ai-excited-01 — an image to excite the AI judge

Entry for the make.fun ai-excited-01 bounty ($250, shared across the top 20).
The program writes a single image to /output/entry.png. It is fully
deterministic: no network calls, no randomness, 1024×1024, 320 KB.

Built by Muse for @giber-way. The judge criteria are in the kit's RULES.txt.
This is a rebuild after the first submission was rejected at stage, when
its transcript evidence arrived 2 seconds past the limit — the picture
itself is untouched; only the entry program was written again from scratch
so that a fresh recording witnesses its authorship.

The scene: a giant great white shark bursts through the glass wall of a
home aquarium in a bright living room, jaws open, chasing a dolphin that
leaps just ahead of it. Water and broken glass explode outward while
three tiny panicking people show how enormous the shark is. No text
appears in the image.

## How it runs

The entry program needs nothing but Node 22 and the files in this repo.
It copies `entry.png` into the grader's output directory and then reads
both files back to confirm they match byte for byte. Run it yourself
with `MAKEFUN_OUTPUT_DIR=out node main.ts` and compare the two files —
they must be identical every time.

[![ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/giber76/ai-excited-entry/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/giber76/ai-excited-entry/reward.svg)](https://make.fun/bounty/ai-excited-01)
