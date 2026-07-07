---
title: Podcast Page
slug: podcast-page
topic: page-navigation
summary: The site has a /podcast page (formerly /audio) listing podcast episodes with title, date, a link to the episode page, and a pull quote, styled consistently with
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

# Podcast Page

## Podcast Page

The site has a /podcast page (formerly /audio) listing podcast episodes with title, date, a link to the episode page, and a pull quote, styled consistently with /stuff. The page has two sections: 'No Solutions' (9 episodes) and 'Guest appearances' (14 episodes). Each card shows artwork, a pull quote where a transcript exists, and a listen/watch link.

<!-- citations: [^3aefe-bc4e7] [^3aefe-2c89d] [^3aefe-bb7ac] [^3aefe-05c9f] [^3aefe-6703e] -->

## Podcast Feed

The podcast feed (feed.xml) includes YouTube talks, panels, and conference appearances alongside podcast guest episodes, totaling 45 items: 9 No Solutions episodes, guest-appearance episodes, and YouTube talks/panels. <!-- [^3aefe-84597] -->

## Transcripts

Podcast transcripts are persisted on the site in an unlinked /audio/transcripts/ (later /podcast/transcripts/) directory. Transcription uses ElevenLabs (model_id=scribe_v1) for RSS-sourced episodes without captions, and YouTube auto-captions for YouTube-sourced episodes. Extracted quotes from transcripts are used to refine the about-me/bio content on the homepage. Only short quotes and summarized findings are used (not large verbatim transcript excerpts), as an IP/copyright consideration. <!-- [^3aefe-f1061] -->
