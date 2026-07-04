# Wiki Index

> Derived cache — do not hand-edit. Rebuilt by proactive-context after each capture.

Last updated: 2026-07-04

## build-pipeline (1 guide)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [ndk-local-bundle](guides/ndk-local-bundle.md) | NDK Local Bundle Pattern | NDK integration on the site uses a local build step (esbuild) that bundles source modules with NDK into committed static `.js` assets | capture | warm | 2026-07-04 | build-pipeline |

## feed-ui (1 guide)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [feed-thread-panel](guides/feed-thread-panel.md) | Feed Thread Panel | Clicking any `.post` card on the `/feed/` page opens a slide-in panel showing the clicked post as the OP plus its replies, in a flat Twitter-style conversation | capture | warm | 2026-07-04 | feed-ui |

## nostr-auth (1 guide)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [nip07-sign-in](guides/nip07-sign-in.md) | NIP-07 Sign-In UI | Writing nostr events on the site uses NIP-07 browser-extension signing (Alby, nos2x) via `NDKNip07Signer` | capture | warm | 2026-07-04 | nostr-auth |

## nostr-features (2 guides)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [essay-comments](guides/essay-comments.md) | Essay Comments (NIP-22) | Comments on articles are part of the original ask but are not yet built | capture | warm | 2026-07-04 | nostr-features |
| [essay-highlights](guides/essay-highlights.md) | Essay Highlights (NIP-84) | Essay pages support NIP-84 (kind:9802) highlights | capture | warm | 2026-07-04 | nostr-features |

## page-navigation (1 guide)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [essays-index-page](guides/essays-index-page.md) | Essays Index Page | A new `/essays/` index page lists the five core essays (01 Attention through 05 Zero) and includes a separate 'on trellis' section linking to `/receipts/`. | capture | warm | 2026-07-04 | page-navigation |

## Research Records (9 records)

| Record | Date | Finding | Agent |
|--------|------|---------|-------|
| [2026-07-04-1-browser-re-test-of-highlight-selection](research/2026-07-04-1-browser-re-test-of-highlight-selection.md) | 2026-07-04 | Browser re-test of highlight selection bug fix: sign-in, text selection, highlight creation, DOM markup, tooltip — verdict PASS | aa9d8fb528099770a |
| [2026-07-04-1-browser-re-test-of-highlight-toolbar](research/2026-07-04-1-browser-re-test-of-highlight-toolbar.md) | 2026-07-04 | Browser re-test of highlight toolbar fix: sign-in, text selection, highlight creation, DOM markup, tooltip — PASS | aa9d8fb528099770a |
| [2026-07-04-1-browser-re-test-of-highlights-js](research/2026-07-04-1-browser-re-test-of-highlights-js.md) | 2026-07-04 | Browser re-test of highlights.js fix: 5-step empirical verification with Result: PASS verdict (sign-in, text selection, highlight button click, DOM mark appearance, tooltip hover) | aa9d8fb528099770a |
| [2026-07-04-2-browser-test-of-feed-thread-js](research/2026-07-04-2-browser-test-of-feed-thread-js.md) | 2026-07-04 | Browser test of feed-thread.js: numbered test items with 'All tests passed' verdict covering hover/click isolation, panel open, OP clone fidelity, and real relay reply loading | ab9abbc68ea8c2223 |
| [2026-07-04-2-browser-test-of-feed-thread-panel](research/2026-07-04-2-browser-test-of-feed-thread-panel.md) | 2026-07-04 | Browser test of feed-thread panel: click isolation, OP clone rendering, live reply loading, link navigation — verdict all tests passed | ab9abbc68ea8c2223 |
| [2026-07-04-3-browser-re-verification-of-two-fixes](research/2026-07-04-3-browser-re-verification-of-two-fixes.md) | 2026-07-04 | Browser re-verification of two fixes: dark-mode contrast legibility and a-tag relay subscription correctness — verdict PASS on both | a5c3054ee6f820c28 |
| [2026-07-04-3-browser-verification-of-two-fixes-a](research/2026-07-04-3-browser-verification-of-two-fixes-a.md) | 2026-07-04 | Browser verification of two fixes (a-tag anchoring + dark-mode contrast): color values and relay REQ messages measured — PASS for both | a5c3054ee6f820c28 |
| [2026-07-04-4-browser-visual-check-of-new-essays](research/2026-07-04-4-browser-visual-check-of-new-essays.md) | 2026-07-04 | Browser visual check of new /essays/ index page: layout coherence, link structure, navigation — SUCCESS | a4a83b3e525c1cf09 |
| [AGENTS](research/AGENTS.md) |  |  |  |

## Episode Cards (3 cards)

| Card | Date | Title | Salience | Status |
|------|------|-------|----------|--------|
| [2026-07-04-1-local-esbuild-build-pipeline-adopted-for](episodes/2026-07-04-1-local-esbuild-build-pipeline-adopted-for.md) | 2026-07-04 | Local esbuild build pipeline adopted for previously build-less static site | architecture | active |
| [2026-07-04-2-nip-84-highlights-with-nip-07](episodes/2026-07-04-2-nip-84-highlights-with-nip-07.md) | 2026-07-04 | NIP-84 highlights with NIP-07 sign-in added to essay pages | product | active |
| [2026-07-04-3-feed-page-made-interactive-with-click](episodes/2026-07-04-3-feed-page-made-interactive-with-click.md) | 2026-07-04 | Feed page made interactive with click-to-expand thread/replies panel | product | active |

## Nouns (8 entities)

| Noun | Name | Origin | Definition |
|------|------|--------|------------|
| [canonical-a-tag](nouns/canonical-a-tag.md) | canonical a-tag | extracted | 30023:fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52:<d-tag-slug> — the stable NIP-33 reference used to anchor highlights to an essay, replacing the r-tagged present URL. |
| [canonical-a-tag-for-highlights](nouns/canonical-a-tag-for-highlights.md) | canonical a-tag for highlights | extracted | A NIP-33 `a` reference in the format `30023:<pubkey>:<slug>` (e.g. `30023:fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52:attention`), used instead of the present URL so highlights work across deploys; both publish and subscribe paths filter on `#a` with this value. |
| [comments](nouns/comments.md) | Comments | extracted | NIP-22 (kind:1111) events anchored via NIP-73 external-content tags (I/K = the essay's canonical URL, since essay pages aren't nostr events themselves), read by filtering #I on that URL, threaded by e/E for replies. |
| [f7z-io-the-site](nouns/f7z-io-the-site.md) | f7z.io (the site) | extracted | A 100% static site — no build, no framework, no server state beyond one Vercel function for NIP-05 — where NDK's 'relays are the backend' model means comments and highlights become nostr events fetched/published client-side with no server to build. |
| [highlights](nouns/highlights.md) | Highlights | extracted | NIP-84 (kind:9802) events where content = selected text, r tag = canonical URL, context tag = surrounding paragraph; published by signed-in users and read back to mark up essay text in place. |
| [receipts-the-trellis-essay](nouns/receipts-the-trellis-essay.md) | receipts (the Trellis essay) | extracted | The essay about Trellis, located at /receipts/; a receipt is 'structure aimed the other way — at what it did, and what it's about to.' |
| [the-site](nouns/the-site.md) | the site | extracted | 100% static (no build, no framework, no server state beyond one Vercel function for NIP-05), so nostr events are fetched and published client-side with relays as the backend. |
| [the-site-f7z-io](nouns/the-site-f7z-io.md) | the site (f7z.io) | extracted | 100% static — no build, no framework, no server state beyond one Vercel function for NIP-05; NDK's 'relays are the backend' model means comments and highlights become nostr events fetched/published client-side with no server to build. |

