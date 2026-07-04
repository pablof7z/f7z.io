---
type: episode-card
date: 2026-07-04
session: f2287014-0012-4b79-a18d-c2caa79d0834
transcript: /Users/pablofernandez/.claude/projects/-Users-pablofernandez-src-f7z-io/f2287014-0012-4b79-a18d-c2caa79d0834.jsonl
salience: architecture
status: active
subjects:
  - build-pipeline
  - ndk-integration
  - static-site-architecture
supersedes: []
related_claims: []
source_lines:
  - 123-128
  - 698-720
  - 1298-1314
  - 1355-1365
captured_at: 2026-07-04T11:47:50Z
---

# Episode: Local esbuild build pipeline adopted for previously build-less static site

## Prior State

f7z.io was a 100% static site with no build step, no framework, no npm dependencies, and no server state beyond one Vercel function for NIP-05. All HTML/CSS/JS was hand-authored and served as-is.

## Trigger

User requested NDK integration for nostr content (highlights, comments, feed replies). When presented with the choice between CDN runtime imports (simpler, but resolves deps on every visit) and a local prebuild bundle (faster, pinned, but requires a manual build step), the user explicitly chose 'local build step.'

## Decision

Adopted esbuild as a local build step: NDK is installed via npm, bundled with esbuild into committed static .js files (~352-355KB each), loaded via <script defer>. No runtime CDN dependency. package.json added with build script. node_modules and .vercel/.claude added to .gitignore.

## Consequences

- Site now has a build step that must be run whenever widget source code changes (not on every deploy, only when src/*.js is edited)
- NDK version is pinned to ^3.0.3; updates require npm install + rebuild
- Two bundles produced: js/highlights.js and js/feed-thread.js, each ~352-355KB minified
- Build script chains both bundles: esbuild src/highlights.js ... && esbuild src/feed-thread.js ...
- Previously build-less site now has package.json, package-lock.json, node_modules/

## Open Tail

- Comments (NIP-22 kind:1111) not yet built — user was told to request it as a second pass

## Evidence

- transcript lines 123-128
- transcript lines 698-720
- transcript lines 1298-1314
- transcript lines 1355-1365

## Conversation

- Cleaned transcript (verbatim user words, abbreviated agent replies): [`transcripts/2026-07-04-1-local-esbuild-build-pipeline-adopted-for.json`](transcripts/2026-07-04-1-local-esbuild-build-pipeline-adopted-for.json)
- Raw transcript (verbatim user words, full agent replies): [`transcripts/raw/2026-07-04-1-local-esbuild-build-pipeline-adopted-for.json`](transcripts/raw/2026-07-04-1-local-esbuild-build-pipeline-adopted-for.json)
