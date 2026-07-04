---
type: research-record
date: 2026-07-04
session: f2287014-0012-4b79-a18d-c2caa79d0834
transcript: /Users/pablofernandez/.claude/projects/-Users-pablofernandez-src-f7z-io/f2287014-0012-4b79-a18d-c2caa79d0834.jsonl
source_lines: 1133-1146
agent_attribution: aa9d8fb528099770a
has_preregistered_criteria: true
has_method: true
has_structured_report: true
characterization: "Browser re-test of highlight selection bug fix: sign-in, text selection, highlight creation, DOM markup, tooltip — verdict PASS"
captured_at: 2026-07-04T12:31:33Z
---

Browser re-test of highlight selection bug fix: sign-in, text selection, highlight creation, DOM markup, tooltip — verdict PASS

---

User: [Tool result]: The fix works. Full re-test on a fresh reload with the rebuilt `js/highlights.js`:

**Result: PASS**

1. Signed in via fake `window.nostr` — button showed `npub1a2e…fawd`.
2. Drag-selected "Comparing the cost of tokens with the cost of human time is not even a comparison." — `window.getSelection().toString()` confirmed exact match.
3. Clicked "Highlight" toolbar button — it did **not** get destroyed mid-click this time; the guard held.
4. `<mark class="n-highlight">` appeared in the DOM:
```html
<mark class="n-highlight" data-key="Comparing the cost of tokens with the cost of human time is not even a comparison." tabindex="0">Comparing the cost of tokens with the cost of human time is not even a comparison.</mark>
```
5. Hovering the mark showed `.n-hl-tooltip` with `is-visible` class, content: `npub1a2e…fawdjust now` (rendered as "npub1a2e…fawd" + "just now" in separate rows).

Console errors observed (all expected/unrelated to the fix, per your note): favicon 404, relay W
