---
title: Site Architecture
slug: site-architecture
topic: site-architecture
summary: The site is a personal static website for pablof7z, built old-school, simple, very minimalistic and unpretentious
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
  - session:3aefe616-5e3d-4be9-8bfb-e5f9e1b8dd81
---

# Site Architecture

## Site Architecture

The site is a personal static website for pablof7z, built old-school, simple, very minimalistic and unpretentious. It uses a black-on-white color scheme with very minimalistic styling. There is no JavaScript anywhere on the site — all content is static HTML/CSS only. The site has no build framework and no server state beyond one Vercel function for NIP-05, using relays as the backend for nostr content.

The nav includes links to home, stuff, now/nownownow, podcast/audio, and feed across all pages.

The 'Find me on nostr' link on the homepage uses _@f7z.io as the NIP-05 identifier and links to nostr:npub1l2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqutajft.

The site is deployed to production at f7z.io via Vercel. Production deploys go through the Vercel CLI directly, not via git push-to-deploy. The site runs under the Vercel project named 'dev-f7z-io'.

<!-- citations: [^f2287-ccf3f] [^f2287-49b99] [^f2287-973b7] [^3aefe-7f287] [^3aefe-cc70a] -->
## Docs Exclusion

The docs/wiki/ folder is excluded from production deploys via .vercelignore so it is not served publicly at f7z.io. The /docs/ path returns 404 on production as intended, confirming it is excluded from the deploy.

<!-- citations: [^f2287-83f3d] [^f2287-5bef5] -->
