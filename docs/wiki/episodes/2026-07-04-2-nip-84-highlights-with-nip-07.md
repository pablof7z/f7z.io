---
type: episode-card
date: 2026-07-04
session: f2287014-0012-4b79-a18d-c2caa79d0834
transcript: /Users/pablofernandez/.claude/projects/-Users-pablofernandez-src-f7z-io/f2287014-0012-4b79-a18d-c2caa79d0834.jsonl
salience: product
status: active
subjects:
  - highlights
  - nip-84
  - nip-07
  - essay-pages
  - dom-event-handling
supersedes: []
related_claims: []
source_lines:
  - 127-129
  - 706-756
  - 1119-1158
  - 1160-1166
captured_at: 2026-07-04T11:47:50Z
---

# Episode: NIP-84 highlights with NIP-07 sign-in added to essay pages

## Prior State

Essay pages (attention, memory, structure, citizens, zero) were static HTML with no interactive nostr features. No highlighting, no sign-in, no relay subscriptions. Pre-existing inline <span class='hi'> emphasis markup was purely presentational.

## Trigger

User directive: 'add capability of signing in if a nip07 is detected -- if the user is signed-in allow the user to create highlights on essays NIP-84; load highlights and mark them up in the text of the essay in a very polished way like medium does.'

## Decision

Implemented src/highlights.js bundled to js/highlights.js, loaded on all five essay pages via <script defer>. Features: (1) floating bottom-right sign-in pill rendered only if NIP-07 extension detected, shows avatar/name when signed in, click to sign out, auto-resigns via localStorage flag; (2) signed-in users select text → 'Highlight' pill appears → publishes NIP-84 kind:9802 event tagged to essay canonical URL via r tag, with context tag for surrounding text; (3) on page load, subscribes for existing highlights on that URL from four public relays, wraps matching text in <mark class='n-highlight'> with hover tooltip showing highlighter name/npub and timestamp; (4) optimistic local rendering without waiting for relay confirmation.

## Consequences

- Essay pages now make WebSocket connections to four public relays on load (relay.damus.io, relay.nostr.band, etc.)
- A DOM race condition was discovered and fixed: the global mouseup listener that creates the selection toolbar had no guard against mouseup events originating from the toolbar itself — clicking 'Highlight' destroyed and recreated the button mid-click, suppressing the browser's synthesized click event. Added guard to ignore mouseup originating inside .n-hl-toolbar. This is a durable root cause for any future dynamic-element-on-mouseup patterns.
- Build must be re-run after editing src/highlights.js (esbuild bundles NDK + source into committed js/highlights.js)
- Relay connection failures (503, timeout) are benign and don't block local functionality

## Open Tail

- Comments (NIP-22) on essays still not implemented
- Relay set is four generic public relays — no f7z.io-specific relay configured

## Evidence

- transcript lines 127-129
- transcript lines 706-756
- transcript lines 1119-1158
- transcript lines 1160-1166

## Conversation

- Cleaned transcript (verbatim user words, abbreviated agent replies): [`transcripts/2026-07-04-2-nip-84-highlights-with-nip-07.json`](transcripts/2026-07-04-2-nip-84-highlights-with-nip-07.json)
- Raw transcript (verbatim user words, full agent replies): [`transcripts/raw/2026-07-04-2-nip-84-highlights-with-nip-07.json`](transcripts/raw/2026-07-04-2-nip-84-highlights-with-nip-07.json)
