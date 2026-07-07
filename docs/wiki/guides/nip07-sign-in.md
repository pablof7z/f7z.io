---
title: NIP-07 Sign-In UI
slug: nip07-sign-in
topic: nostr-auth
summary: Writing nostr events on the site uses NIP-07 browser-extension signing (Alby, nos2x) via `NDKNip07Signer`
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

# NIP-07 Sign-In UI

## NIP-07 Signing

Writing nostr events on the site uses NIP-07 browser-extension signing (Alby, nos2x) via `NDKNip07Signer`. No login system is needed, and reading requires no signer at all. <!-- [^f2287-b1572] -->

The sign-in UI is a floating bottom-right pill, only rendered when a NIP-07 extension is detected. After sign-in it shows the user's avatar and name, and clicking it signs out. On return visits it silently re-signs-in via a localStorage flag. <!-- [^f2287-0cced] -->

Writing nostr events on the site uses NIP-07 browser-extension signing (Alby, nos2x) via `NDKNip07Signer`. No login system is needed, and reading requires no signer at all.

The sign-in UI is a floating bottom-right pill, only rendered when a NIP-07 extension is detected. After sign-in it shows the user's avatar and name, and clicking it signs out. On return visits it silently re-signs-in via a localStorage flag.

The 'find me on nostr' link uses _@f7z.io as the NIP-05 identifier and links to nostr:npub1l2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqutajft. <!-- [^3aefe-8ae99] -->
