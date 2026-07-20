#!/usr/bin/env python3
"""Render an ElevenLabs Scribe JSON response into a diarized transcript.

Usage: render-transcript.py <raw.json> <out.txt> [name1,name2,...]

Groups the word-level ``words`` array into speaker turns, prefixing each turn
with a timestamp and speaker label. ElevenLabs speaker IDs are mapped in
first-appearance order. Optional names replace generic ``Speaker N`` labels.
"""
import json
import sys


def fmt_ts(seconds):
    seconds = int(seconds or 0)
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    if h:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def main():
    raw, out = sys.argv[1], sys.argv[2]
    names = [n.strip() for n in sys.argv[3].split(",")] if len(sys.argv) > 3 else []
    with open(raw) as f:
        data = json.load(f)

    words = data.get("words") or []
    if not words:
        text = data.get("text", "").strip()
        if not text:
            sys.exit("no words and no text in response")
        with open(out, "w") as f:
            f.write(text + "\n")
        print(f"      -> {out} (flat text, no diarization)")
        return

    labels = {}

    def label_for(sid):
        if sid not in labels:
            idx = len(labels)
            labels[sid] = names[idx] if idx < len(names) else f"Speaker {idx + 1}"
        return labels[sid]

    turns = []
    for word in words:
        sid = word.get("speaker_id") or "speaker_0"
        label = label_for(sid)
        text = word.get("text", "")

        if turns and turns[-1][0] == label:
            turns[-1][2].append(text)
        else:
            turns.append([label, word.get("start", 0.0), [text]])

    lines = []
    for label, start, parts in turns:
        text = "".join(parts).strip()
        if text:
            lines.append(f"[{fmt_ts(start)}] {label}: {text}")

    with open(out, "w") as f:
        f.write("\n\n".join(lines) + "\n")

    print(f"      -> {out} ({len(labels)} speakers, {len(lines)} turns)")


if __name__ == "__main__":
    main()
