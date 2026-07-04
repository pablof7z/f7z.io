---
title: Feed Thread Panel
slug: feed-thread-panel
topic: feed-ui
summary: Clicking any `.post` card on the `/feed/` page opens a slide-in panel showing the clicked post as the OP plus its replies, in a flat Twitter-style conversation
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

# Feed Thread Panel

## Feed Thread Panel

Clicking any `.post` card on the `/feed/` page opens a slide-in panel showing the clicked post as the OP plus its replies, in a flat Twitter-style conversation view. The panel reuses the same `.detail-panel`/`.detail-backdrop` chrome already used on `/nownownow/`. The 'view on nostr' link inside a post card still navigates normally and is not swallowed by the card's click handler.

The panel subscribes live via NDK for kind:1 events tagging the note's id across four public relays, rendering each reply as a `.post`-styled card with avatar, name/nip05, relative timestamp, content, and its own 'view on nostr' link. The subscription matches all kind:1 events tagging the post via `#e` without NIP-10 marker filtering, so a quote-post that merely mentions the note could appear alongside true replies.

Panel state does not leak between posts: opening a new post resets the reply list, and empty/loading states render correctly when no replies are found.

<!-- citations: [^f2287-db3fb] [^f2287-5a205] [^f2287-79cd0] -->
## Feed Thread Bundle

The feed thread bundle is built from `src/feed-thread.js` into `js/feed-thread.js` using the same local-esbuild-bundle pattern, ~352KB minified, loaded with `defer`. <!-- [^f2287-a49d7] -->
