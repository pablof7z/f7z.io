# Wiki Index

> Derived cache — do not hand-edit. Rebuilt by proactive-context after each capture.

Last updated: 2026-07-07

## build-pipeline (1 guide)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [ndk-local-bundle](guides/ndk-local-bundle.md) | NDK Local Bundle Pattern | NDK integration on the site uses a local build step (esbuild) that bundles source modules with NDK into committed static `.js` assets | capture | warm | 2026-07-04 | build-pipeline |

## feed-ui (1 guide)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [feed-thread-panel](guides/feed-thread-panel.md) | Feed Thread Panel | The site has a `/feed` page with selected nostr notes rendered as post cards â avatar, name/handle, date header, content, and a 'view on nostr' link footer â | capture | warm | 2026-07-04 | feed-ui |

## nostr-auth (1 guide)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [nip07-sign-in](guides/nip07-sign-in.md) | NIP-07 Sign-In UI | Writing nostr events on the site uses NIP-07 browser-extension signing (Alby, nos2x) via `NDKNip07Signer` | capture | warm | 2026-07-04 | nostr-auth |

## nostr-features (3 guides)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [essay-comments](guides/essay-comments.md) | Essay Comments (NIP-22) | Comments on articles are part of the original ask but are not yet built | capture | warm | 2026-07-04 | nostr-features |
| [essay-highlights](guides/essay-highlights.md) | Essay Highlights (NIP-84) | Essay pages support NIP-84 (kind:9802) highlights | capture | warm | 2026-07-04 | nostr-features |
| [nostr-content-pipeline](guides/nostr-content-pipeline.md) | Nostr Content Pipeline | Nostr note content for the site is sourced using `nak req -k 1 -a fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52 -outbox \| jq -r .content`, pa | capture | warm | 2026-07-04 | nostr-features |

## page-navigation (6 guides)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [about-me](guides/about-me.md) | About Me Section | The site includes an About Me section on the homepage. | capture | warm | 2026-07-04 | page-navigation |
| [essays-index-page](guides/essays-index-page.md) | Essays Index Page | A new `/essays/` index page lists the five core essays (01 Attention through 05 Zero) plus a separate 'on trellis' section linking to `/receipts/`. | capture | warm | 2026-07-04 | page-navigation |
| [nownownow-page](guides/nownownow-page.md) | NowNowNow Page | The site has a `/nownownow` page presented in changelog format | capture | warm | 2026-07-04 | page-navigation |
| [podcast-page](guides/podcast-page.md) | Podcast Page | The site has a /podcast page (formerly /audio) listing podcast episodes with title, date, a link to the episode page, and a pull quote, styled consistently with | capture | warm | 2026-07-04 | page-navigation |
| [stuff-page](guides/stuff-page.md) | Stuff Page | The site has a `/stuff` page with one-liner descriptions of the projects pablof7z works on | capture | warm | 2026-07-04 | page-navigation |
| [trellis-essay-outline](guides/trellis-essay-outline.md) | Trellis Essay Outline | The follow-up Trellis essay can be approached from any of eight divergent angles | capture | warm | 2026-07-04 | page-navigation |

## site-architecture (2 guides)

| Slug | Title | Summary | Tags | Volatility | Verified | Topic |
|------|-------|---------|------|------------|----------|-------|
| [git-branch-management](guides/git-branch-management.md) | Git Branch Management | The git branch for the rebuild is `old-school-rebuild`, a clean orphan branch | capture | warm | 2026-07-04 | site-architecture |
| [site-architecture](guides/site-architecture.md) | Site Architecture | The site is a personal static website for pablof7z, built old-school, simple, very minimalistic and unpretentious | capture | warm | 2026-07-04 | site-architecture |

## Research Records (14 records)

| Record | Date | Finding | Agent |
|--------|------|---------|-------|
| [2026-07-04-1-browser-re-test-of-highlight-selection](research/2026-07-04-1-browser-re-test-of-highlight-selection.md) | 2026-07-04 | Browser re-test of highlight selection bug fix: sign-in, text selection, highlight creation, DOM markup, tooltip — verdict PASS | aa9d8fb528099770a |
| [2026-07-04-1-browser-re-test-of-highlight-toolbar](research/2026-07-04-1-browser-re-test-of-highlight-toolbar.md) | 2026-07-04 | Browser re-test of highlight toolbar fix: sign-in, text selection, highlight creation, DOM markup, tooltip — PASS | aa9d8fb528099770a |
| [2026-07-04-1-browser-re-test-of-highlights-js](research/2026-07-04-1-browser-re-test-of-highlights-js.md) | 2026-07-04 | Browser re-test of highlights.js fix: 5-step empirical verification with Result: PASS verdict (sign-in, text selection, highlight button click, DOM mark appearance, tooltip hover) | aa9d8fb528099770a |
| [2026-07-04-1-browser-verification-of-highlight-contrast-fix](research/2026-07-04-1-browser-verification-of-highlight-contrast-fix.md) | 2026-07-04 | Browser verification of highlight contrast fix and a-tag anchoring fix — both PASS | a5c3054ee6f820c28 |
| [2026-07-04-1-highlight-toolbar-click-fix-re-test](research/2026-07-04-1-highlight-toolbar-click-fix-re-test.md) | 2026-07-04 | Highlight toolbar click-fix re-test in browser — PASS (sign-in, text selection, highlight creation, DOM markup, tooltip all confirmed) | aa9d8fb528099770a |
| [2026-07-04-2-browser-test-of-feed-thread-js](research/2026-07-04-2-browser-test-of-feed-thread-js.md) | 2026-07-04 | Browser test of feed-thread.js: numbered test items with 'All tests passed' verdict covering hover/click isolation, panel open, OP clone fidelity, and real relay reply loading | ab9abbc68ea8c2223 |
| [2026-07-04-2-browser-test-of-feed-thread-panel](research/2026-07-04-2-browser-test-of-feed-thread-panel.md) | 2026-07-04 | Browser test of feed-thread panel: click isolation, OP clone rendering, live reply loading, link navigation — verdict all tests passed | ab9abbc68ea8c2223 |
| [2026-07-04-2-feed-thread-panel-browser-test-all](research/2026-07-04-2-feed-thread-panel-browser-test-all.md) | 2026-07-04 | Feed thread panel browser test — all tests passed (post click, OP clone, live relay replies, link-click isolation) | ab9abbc68ea8c2223 |
| [2026-07-04-3-a-tag-anchoring-and-dark-mode](research/2026-07-04-3-a-tag-anchoring-and-dark-mode.md) | 2026-07-04 | A-tag anchoring and dark-mode contrast fix verification — both PASS (relay filter uses #a tag, CSS color legible in dark mode) | a5c3054ee6f820c28 |
| [2026-07-04-3-browser-re-verification-of-two-fixes](research/2026-07-04-3-browser-re-verification-of-two-fixes.md) | 2026-07-04 | Browser re-verification of two fixes: dark-mode contrast legibility and a-tag relay subscription correctness — verdict PASS on both | a5c3054ee6f820c28 |
| [2026-07-04-3-browser-verification-of-two-fixes-a](research/2026-07-04-3-browser-verification-of-two-fixes-a.md) | 2026-07-04 | Browser verification of two fixes (a-tag anchoring + dark-mode contrast): color values and relay REQ messages measured — PASS for both | a5c3054ee6f820c28 |
| [2026-07-04-4-browser-visual-check-of-new-essays](research/2026-07-04-4-browser-visual-check-of-new-essays.md) | 2026-07-04 | Browser visual check of new /essays/ index page: layout coherence, link structure, navigation — SUCCESS | a4a83b3e525c1cf09 |
| [2026-07-04-4-essays-index-page-visual-render-check](research/2026-07-04-4-essays-index-page-visual-render-check.md) | 2026-07-04 | Essays index page visual render check — SUCCESS (layout coherence, nav link, all 6 links verified in light/dark mode) | a4a83b3e525c1cf09 |
| [AGENTS](research/AGENTS.md) |  |  |  |

## Episode Cards (4 cards)

| Card | Date | Title | Salience | Status |
|------|------|-------|----------|--------|
| [2026-07-04-1-local-esbuild-build-pipeline-adopted-for](episodes/2026-07-04-1-local-esbuild-build-pipeline-adopted-for.md) | 2026-07-04 | Local esbuild build pipeline adopted for previously build-less static site | architecture | active |
| [2026-07-04-1-podcast-feed-scope-expanded-from-own](episodes/2026-07-04-1-podcast-feed-scope-expanded-from-own.md) | 2026-07-04 | Podcast feed scope expanded from own show to all appearances + talks | product | active |
| [2026-07-04-2-nip-84-highlights-with-nip-07](episodes/2026-07-04-2-nip-84-highlights-with-nip-07.md) | 2026-07-04 | NIP-84 highlights with NIP-07 sign-in added to essay pages | product | active |
| [2026-07-04-3-feed-page-made-interactive-with-click](episodes/2026-07-04-3-feed-page-made-interactive-with-click.md) | 2026-07-04 | Feed page made interactive with click-to-expand thread/replies panel | product | active |

## Nouns (32 entities)

| Noun | Name | Origin | Definition |
|------|------|--------|------------|
| [agent-tenex-context](nouns/agent-tenex-context.md) | agent (TENEX context) | extracted | A pubkey with an identity, lessons, and accountability that derives its instruction set from its definition plus all trusted lessons plus trusted human corrections — compiled for contradictions, not flattened into mush. |
| [canonical-a-tag](nouns/canonical-a-tag.md) | canonical a-tag | extracted | 30023:fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52:<d-tag-slug> — the stable NIP-33 reference used to anchor highlights to an essay, replacing the r-tagged present URL. |
| [canonical-a-tag-for-highlights](nouns/canonical-a-tag-for-highlights.md) | canonical a-tag for highlights | extracted | A NIP-33 `a` reference in the format `30023:<pubkey>:<slug>` (e.g. `30023:fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52:attention`), used instead of the present URL so highlights work across deploys; both publish and subscribe paths filter on `#a` with this value. |
| [canonical-a-tag-highlight-anchoring](nouns/canonical-a-tag-highlight-anchoring.md) | canonical a-tag (highlight anchoring) | extracted | A NIP-33 reference in the format 30023:fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52:<d-tag-slug> (e.g. 30023:fa98...52:attention), used instead of the page URL to tag and filter highlights so they work across deploys and domains. |
| [chirp](nouns/chirp.md) | Chirp | extracted | A Nostr client built on top of NMP (nostr-multi-platform). |
| [comments](nouns/comments.md) | Comments | extracted | NIP-22 (kind:1111) events anchored via NIP-73 external-content tags (I/K = the essay's canonical URL, since essay pages aren't nostr events themselves), read by filtering #I on that URL, threaded by e/E for replies. |
| [comments-planned](nouns/comments-planned.md) | Comments (planned) | extracted | NIP-22 events (kind:1111) anchored to essays via NIP-73 external-content tags (I/K = the essay's canonical URL), threaded by e/E tags for replies. |
| [exit-pub](nouns/exit-pub.md) | EXIT.pub | extracted | A tool to port your entire Twitter archive into nostr, preserving original dates, with granular relay control — described as 'the last bridge you'll need.' |
| [f7z-io-site](nouns/f7z-io-site.md) | f7z.io site | extracted | A 100% static site (no build, no framework, no server state) beyond one Vercel serverless function for NIP-05; NDK's relay model serves as the backend for nostr interactions. |
| [f7z-io-the-site](nouns/f7z-io-the-site.md) | f7z.io (the site) | extracted | A 100% static site — no build, no framework, no server state beyond one Vercel function for NIP-05 — where NDK's 'relays are the backend' model means comments and highlights become nostr events fetched/published client-side with no server to build. |
| [feed-page](nouns/feed-page.md) | /feed page | extracted | A hand-picked selection of things the user has said on nostr, 2020–2026, rendered as post cards with links back to the original nostr events. |
| [highlights](nouns/highlights.md) | Highlights | extracted | NIP-84 (kind:9802) events where content = selected text, r tag = canonical URL, context tag = surrounding paragraph; published by signed-in users and read back to mark up essay text in place. |
| [ndk](nouns/ndk.md) | NDK | extracted | The development kit behind a big chunk of the nostr ecosystem. |
| [nip-ae](nouns/nip-ae.md) | NIP-AE | extracted | A nostr NIP defining agent infrastructure: agent definitions (kind 4199), agent lessons (4129), nudges (4201), attribution (14199), MCP servers (4200), and skill announcements (4202). An agent is a pubkey that derives its instruction set from its definition plus trusted lessons plus trusted human corrections. |
| [nmp](nouns/nmp.md) | NMP | extracted | A pattern for building native multi-platform apps with a shared Rust core, applied to Nostr — one Rust core with thin native shells on iOS/Android/web. |
| [no-solutions-podcast](nouns/no-solutions-podcast.md) | No Solutions (podcast) | extracted | A dialogue podcast with Gigi — 'no solutions; only trade-offs. Walking towards a better internet.' |
| [nownownow-page](nouns/nownownow-page.md) | /nownownow page | extracted | A page on the site in changelog format, tl;dr'd on the homepage. |
| [nsecbunker](nouns/nsecbunker.md) | nsecBunker | extracted | Remote key signing for nostr; a self-hosted hardware-wallet-like service for your Nostr key. |
| [nutsack](nouns/nutsack.md) | nutsack | extracted | The NIP-60/61 Cashu wallet monorepo — ecash tokens stored encrypted on relays means your wallet is portable across every client that speaks the standard. |
| [purplepag-es](nouns/purplepag-es.md) | purplepag.es | extracted | A relay that does one thing: profiles. Boring infrastructure that half of nostr quietly depends on. |
| [purplepages](nouns/purplepages.md) | purplepages | extracted | A relay that does one thing: profiles. Boring infrastructure that half of nostr quietly depends on; later expanded to the broader category of 'lists.' |
| [receipts-essay](nouns/receipts-essay.md) | Receipts (essay) | extracted | An essay about Trellis; conceptually, a receipt is 'structure aimed the other way — at what it did, and what it's about to.' |
| [receipts-the-trellis-essay](nouns/receipts-the-trellis-essay.md) | receipts (the Trellis essay) | extracted | The essay about Trellis, located at /receipts/; a receipt is 'structure aimed the other way — at what it did, and what it's about to.' |
| [sovereign-engineering](nouns/sovereign-engineering.md) | Sovereign Engineering | extracted | A 6-week intensive program bringing 21 participants to Madeira for collaborative building of freedom tech, with demo day every Friday, operated by six captains. Motivated by self-sovereignty, permissionless innovation, and shipping real usable applications. |
| [stuff-page](nouns/stuff-page.md) | /stuff page | extracted | A page on the site with one-liner descriptions of the things the user works on. |
| [tenex](nouns/tenex.md) | TENEX | extracted | Orchestrating AI agents over nostr so they don't need the user in the loop — agents as first-class citizens with their own keys, money, and reputation. |
| [the-site](nouns/the-site.md) | the site | extracted | 100% static (no build, no framework, no server state beyond one Vercel function for NIP-05), so nostr events are fetched and published client-side with relays as the backend. |
| [the-site-f7z-io](nouns/the-site-f7z-io.md) | the site (f7z.io) | extracted | 100% static — no build, no framework, no server state beyond one Vercel function for NIP-05; NDK's 'relays are the backend' model means comments and highlights become nostr events fetched/published client-side with no server to build. |
| [vendata-io-dvms](nouns/vendata-io-dvms.md) | vendata.io / DVMs | extracted | A compute marketplace on nostr: post a job, machines bid, pay in sats. A Nostr-based marketplace where users post composable jobs and providers competitively fulfill them. |
| [vibeline](nouns/vibeline.md) | vibeline | extracted | Talk into your phone, get back structured, actionable output. |
| [wikifreedia](nouns/wikifreedia.md) | Wikifreedia | extracted | Wikipedia without the editorial politburo — truth doesn't come from consensus; authors sign their edits and the web of trust sorts it out. |
| [writing-signing](nouns/writing-signing.md) | writing/signing | extracted | NIP-07 browser-extension signing (Alby, nos2x) via NDKNip07Signer — no login system needed; reading requires no signer at all, only publishing does. |

