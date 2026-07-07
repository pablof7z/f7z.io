---
title: Git Branch Management
slug: git-branch-management
topic: site-architecture
summary: The git branch for the rebuild is `old-school-rebuild`, a clean orphan branch
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

# Git Branch Management

## Rebuild Branch

The git branch for the rebuild is `old-school-rebuild`, a clean orphan branch. It is not pushed to GitHub without user approval. The `.claude/` directory, which contains internal harness state, is excluded from git commits. <!-- [^3aefe-90264] -->
