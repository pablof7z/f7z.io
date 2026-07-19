---
type: episode-card
date: 2026-07-16
session: c7d84305-2d54-4c84-a6e9-327f292557bc
transcript: /Users/pablofernandez/.claude/projects/-Users-pablofernandez-src-f7z-io/c7d84305-2d54-4c84-a6e9-327f292557bc.jsonl
salience: architecture
status: active
subjects:
  - notification-mechanism
  - claude-md-config
  - tts-skill
supersedes: []
related_claims: []
source_lines:
  - 1-18
  - 45-49
  - 113-128
captured_at: 2026-07-16T15:20:07Z
---

# Episode: Notification mechanism replaced: raw `say` command → `tts` skill

## Prior State

Global `~/.claude/CLAUDE.md` contained a standing instruction to use the macOS `say` command for important notifications, applying across all projects.

## Trigger

User questioned why `say` was being used, identified the source, and directed its deletion. Assistant then proactively replaced the deleted instruction with a reference to the `tts` skill rather than leaving the file empty.

## Decision

The `say` command is no longer the notification mechanism. `~/.claude/CLAUDE.md` was emptied and then rewritten to point to the `tts` skill for important notifications instead of raw `say`.

## Consequences

- All future sessions will use the `tts` skill rather than the bare `say` command for audible notifications.
- Searches across memory files, the f7z.io repo, and global `.claude` config confirmed no other active `say` instructions exist outside `~/.agents`.
- Four files in `~/.agents` still contain `say` references but were classified as historical rationale or workflow policy rather than active instructions — not cleaned up.

## Open Tail

- The `~/.agents` files (reconcile-local-only-protocol-network.md, reconcile-local-only-product-workflow.md, inbox-monitor.md) still contain `say` references; no decision was made to update or tombstone them.
- The `tts` skill itself was not examined — its behavior, availability, and parity with `say` are unverified.

## Evidence

- transcript lines 1-18
- transcript lines 45-49
- transcript lines 113-128

## Conversation

- Cleaned transcript (verbatim user words, abbreviated agent replies): [`transcripts/2026-07-16-c7d843052d54-89b2ddd6-1-notification-mechanism-replaced-raw-say-command.json`](transcripts/2026-07-16-c7d843052d54-89b2ddd6-1-notification-mechanism-replaced-raw-say-command.json)
- Raw transcript (verbatim user words, full agent replies): [`transcripts/raw/2026-07-16-c7d843052d54-89b2ddd6-1-notification-mechanism-replaced-raw-say-command.json`](transcripts/raw/2026-07-16-c7d843052d54-89b2ddd6-1-notification-mechanism-replaced-raw-say-command.json)
