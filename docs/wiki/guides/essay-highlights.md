---
title: Essay Highlights (NIP-84)
slug: essay-highlights
topic: nostr-features
summary: "Essay pages support NIP-84 (kind:9802) highlights"
tags:
  - capture
volatility: warm
confidence: medium
created: 2026-07-04
updated: 2026-07-04
verified: 2026-07-04
compiled-from: conversation
sources:
  - session:f2287014-0012-4b79-a18d-c2caa79d0834
---

# Essay Highlights (NIP-84)

## Overview

Essay pages support NIP-84 (kind:9802) highlights. When a NIP-07 browser extension is detected, the essay pages render a sign-in control. Once signed in, users can create highlights by selecting text and clicking a 'Highlight' pill, which publishes a kind:9802 event and renders the highlight optimistically in the DOM without waiting for relay confirmation. Existing highlights are loaded from relays and marked up in the essay text in a polished, Medium-style way, with a hover tooltip showing the highlighter's name/npub and timestamp.

Highlights are anchored using a stable NIP-33 a-tag reference of the form 30023:<pubkey>:<slug> (e.g. 30023:fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52:attention) rather than the present page URL, so anchoring works correctly across preview deploys and domain variants. The slug is derived from the URL path (e.g. 'attention', 'memory') and the pubkey is hardcoded to the site's own identity, the same one api/nip05.js resolves. Both the publish path and the load/subscribe filter use this a-tag reference, with the load filter structured as kinds:[9802], '#a': ['30023:<pubkey>:<slug>']. (Previously: highlights were tagged to the essay's canonical URL.)

Created highlights appear in the DOM as <mark class="n-highlight"> wrapping the selected text. Highlight marks use color: inherit so text renders as cream with a subtle orange underline stroke in dark mode instead of the browser's default black-on-yellow <mark> styling.

<!-- citations: [^f2287-4cebc] [^f2287-f8835] [^f2287-bc4f5] -->
## Toolbar Event Handling

The global mouseup listener that opens the highlight toolbar ignores mouseup events originating inside `.n-hl-toolbar` to prevent a DOM race where clicking the Highlight button destroys-and-recreates the button mid-click and suppresses the browser's click event. <!-- [^f2287-d2f4b] -->

## Build & Integration

The highlights bundle is built via `npm run build` (esbuild) from `src/highlights.js` into the committed static `js/highlights.js`, ~355KB minified (~90-100KB gzipped), loaded via `<script defer>` with no runtime CDN dependency. The highlights script tag is wired into the `attention`/`memory`/`structure`/`citizens`/`zero` essay pages, placed after `</footer>` for consistency with the homepage's pattern.

<!-- citations: [^f2287-79e0b] [^f2287-b7644] -->
