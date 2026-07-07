---
type: episode-card
date: 2026-07-04
session: 3aefe616-5e3d-4be9-8bfb-e5f9e1b8dd81
transcript: /Users/pablofernandez/.claude/projects/-Users-pablofernandez-src-f7z-io/3aefe616-5e3d-4be9-8bfb-e5f9e1b8dd81.jsonl
salience: product
status: active
subjects:
  - podcast-feed
  - podcast-page
  - site-structure
supersedes: []
related_claims: []
source_lines:
  - 3700-3701
  - 3717-3737
  - 3784-3785
  - 3839-3840
  - 3925-3931
captured_at: 2026-07-04T16:01:48Z
---

# Episode: Podcast feed scope expanded from own show to all appearances + talks

## Prior State

The podcast feed (feed.xml) and /podcast/ page contained only episodes of 'No Solutions' — the user's own dialogue podcast with Gigi. The page was a single-section listing scoped to that one show.

## Trigger

User reported the feed was 'missing A LOT of podcasts episodes' and asked 'can't we have YouTube talks in the feed too?' — a correction that the feed's scope was too narrow.

## Decision

Expanded the podcast feed from 23 to 45 items by adding two new categories: (1) Guest appearances on other podcasts (5 additional episodes from The Investor's Podcast, Swan Signal Live, Citizen Bitcoin, Swan Lounge, Plebchain PCR45) and (2) Talks & panels — 17 YouTube talks/workshops/keynotes (Nostrica, BTC Prague, Bitcoin Atlantis, Bitcoin.Review, etc.). The podcast page was restructured from one section into 'No Solutions', 'Guest appearances', and 'Talks & panels' sections, with each card showing artwork, pull quotes (where transcripts exist), and listen/watch links.

## Consequences

- Feed and page are kept in sync at 45 items each (validated XML, balanced li tags).
- Three episodes (Reject The Frame, Remnant #3, Navigating Bitcoin's Noise) were deliberately excluded because reliable direct links or RSS entries could not be found — left as open follow-ups rather than fabricating URLs.
- The podcast page's identity shifted from 'my podcast' to 'my complete media presence', changing how visitors discover and consume Pablo's appearances.

## Open Tail

- Locate and add the 3 skipped episodes if reliable URLs surface.
- Future appearances need a sustainable process for adding to the feed rather than one-off batch mining.

## Evidence

- transcript lines 3700-3701
- transcript lines 3717-3737
- transcript lines 3784-3785
- transcript lines 3839-3840
- transcript lines 3925-3931

## Conversation

- Cleaned transcript (verbatim user words, abbreviated agent replies): [`transcripts/2026-07-04-1-podcast-feed-scope-expanded-from-own.json`](transcripts/2026-07-04-1-podcast-feed-scope-expanded-from-own.json)
- Raw transcript (verbatim user words, full agent replies): [`transcripts/raw/2026-07-04-1-podcast-feed-scope-expanded-from-own.json`](transcripts/raw/2026-07-04-1-podcast-feed-scope-expanded-from-own.json)
