---
title: Nostr Content Pipeline
slug: nostr-content-pipeline
topic: nostr-features
summary: Nostr note content for the site is sourced using `nak req -k 1 -a fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52 -outbox | jq -r .content`, pa
tags:
  - capture
volatility: warm
confidence: medium
created: 2026-07-04
updated: 2026-07-04
verified: 2026-07-04
compiled-from: conversation
sources:
  - session:3aefe616-5e3d-4be9-8bfb-e5f9e1b8dd81
---

# Nostr Content Pipeline

## Nostr Content Pipeline

Nostr note content for the site is sourced using `nak req -k 1 -a fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52 -outbox | jq -r .content`, paginating through all notes. The nostr note 'I'm so bullshit about nostr' is included in the site content.

The note-processing pipeline uses a multi-stage agent approach: Haiku agents triage the 5,600 nostr notes into signal vs. noise, then a Sonnet agent structures the combined filtered notes into a dated 'why'-focused briefing, then a Fable agent writes the final copy.

<!-- citations: [^3aefe-ee2f2] [^3aefe-fb85c] -->
