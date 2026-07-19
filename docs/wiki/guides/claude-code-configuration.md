---
title: Claude Code Configuration
slug: claude-code-configuration
topic: claude-code-configuration
summary: The global `~/.claude/CLAUDE.md` notification instruction uses the `tts` skill instead of the raw macOS `say` command
tags:
  - capture
volatility: warm
confidence: medium
created: 2026-07-16
updated: 2026-07-16
verified: 2026-07-16
compiled-from: conversation
sources:
  - session:c7d84305-2d54-4c84-a6e9-327f292557bc
---

# Claude Code Configuration

## Notification Configuration

The global `~/.claude/CLAUDE.md` notification instruction uses the `tts` skill instead of the raw macOS `say` command. No references to the `say` command for notifications exist in the memory directory files (`MEMORY.md`, `deploy_defaults_to_prod.md`, `stuff-page-copy-voice.md`); only the English word "says" appears. The f7z.io repo contains no project-level Claude Code configuration instructing use of the macOS `say` command for notifications. Separately, the `~/.agents/homes/chief-of-staff/workflows/inbox-monitor.md` workflow instructs the chief-of-staff agent to use `say` when a session finishes or fails, with no alert for the comment itself. The `~/.agents/home/harbor-134-codex/design-exploration-capture/nmp/` files are historical design-exploration session transcripts, not live agent configuration.

<!-- citations: [^c7d84-938ad] [^c7d84-551cd] -->
