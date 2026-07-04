---
title: NDK Local Bundle Pattern
slug: ndk-local-bundle
topic: build-pipeline
summary: NDK integration on the site uses a local build step (esbuild) that bundles source modules with NDK into committed static `.js` assets
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

# NDK Local Bundle Pattern

## NDK Local Bundle

NDK integration on the site uses a local build step (esbuild) that bundles source modules with NDK into committed static `.js` assets. The bundled scripts are loaded with `<script defer>` and have no runtime CDN dependency. NDK nostr content (comments and highlights) loads client-side on the static site with relays as the backend, requiring no server beyond the existing NIP-05 Vercel function.

<!-- citations: [^f2287-fa096] [^f2287-a6bcb] [^f2287-c1bf5] -->
