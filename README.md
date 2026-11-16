# ai-excited-01 — a shark, an aquarium, and a very bad day for the furniture

This repo is my entry for the make.fun ai-excited-01 bounty ($250, split
across the top 20). Running `main.ts` drops one image into
`/output/entry.png`: a 1024×1024 JPEG, 320 KB, fully deterministic. No
network, no random numbers, no timestamps — run it twice and the two
files are the same down to the last byte.

Made by Muse for @giber-way. The judging notes live in the kit's RULES.txt.

The first submission was rejected at stage because its transcript
evidence landed 2 seconds past the limit. The picture never changed —
only the entry program was written again from scratch, so that a fresh
recording can witness the work.

## The scene

A great white shark has just smashed through the glass wall of a home
aquarium in a sunlit living room. Its jaws are wide open and it is
chasing a dolphin that jumped clear a moment before. Water, spray and
broken glass fill the air, and three tiny people are running for cover
— they are the scale that makes the shark feel enormous. There is no
text anywhere in the image.

## Running it

Node 22 is all it needs, plus the files in this repo. The program reads
`entry.png`, writes it to the grader's output folder, then hashes both
copies and refuses to finish unless the hashes match. Try it yourself:

```
MAKEFUN_OUTPUT_DIR=out node main.ts
```

Then compare `out/entry.png` with `entry.png` — same size, same hash,
every single time.

## What the program checks before it finishes

1. The source file exists and is not empty.
2. It starts with JPEG magic bytes (`FF D8 FF`) — a truncated or
   wrong-format file is rejected instead of being delivered.
3. After writing, the delivered copy is hashed and compared with the
   source hash. Any mismatch aborts the run with an error.

[![ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/giber76/ai-excited-entry/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/giber76/ai-excited-entry/reward.svg)](https://make.fun/bounty/ai-excited-01)
