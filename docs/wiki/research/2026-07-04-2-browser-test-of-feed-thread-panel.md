---
type: research-record
date: 2026-07-04
session: f2287014-0012-4b79-a18d-c2caa79d0834
transcript: /Users/pablofernandez/.claude/projects/-Users-pablofernandez-src-f7z-io/f2287014-0012-4b79-a18d-c2caa79d0834.jsonl
source_lines: 1376-1384
agent_attribution: ab9abbc68ea8c2223
has_preregistered_criteria: true
has_method: true
has_structured_report: true
characterization: "Browser test of feed-thread panel: click isolation, OP clone rendering, live reply loading, link navigation — verdict all tests passed"
captured_at: 2026-07-04T12:31:33Z
---

Browser test of feed-thread panel: click isolation, OP clone rendering, live reply loading, link navigation — verdict all tests passed

---

User: [Tool result]: All tests passed. Summary:

**1-2. Hover/click isolation**: Posts show pointer cursor. Clicking "view on nostr →" navigated the tab to `njump.me` and left `.detail-panel.open` count at 0 — the link click does not trigger the panel.

**3-4. Panel open (older post, Sep 16, 2022 Bitcoin post)**: Clicking the post body set `.detail-panel` class to `"detail-panel thread-panel open"`. The panel's OP clone matched the source post exactly (avatar, name, date, content, "view on nostr" link).

**5. Replies**: Real replies arrived — within the first snapshot (well under 8s) one reply card was appended, and the "Loading replies…" text was already gone (replaced, not left stale). Held steady at 1 reply after an additional 6s wait. Example reply outerHTML:
```html
<article class="post reply"><header class="post-head"><img class="post-avatar" width="36" height="36" loading="lazy" referrerpolicy="no-referrer" src="https://m.primal.net/KwlG.jpg"><div class="post-who"><span class="post-name">PAB
