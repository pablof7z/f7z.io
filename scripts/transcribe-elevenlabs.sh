#!/usr/bin/env bash
#
# Transcribe audio files with ElevenLabs Scribe (speech-to-text), with speaker
# diarization and word-level timestamps.
# Usage: transcribe-elevenlabs.sh <audio_dir> <transcript_out_dir> [num_speakers]
#
# Reads ELEVENLABS_API_KEY from ~/.config/PAI/.env if not already set.
# Each <audio_dir>/<name>.<ext> becomes <out_dir>/<name>.txt (skipped if it exists).
# The raw ElevenLabs JSON is kept alongside as <out_dir>/<name>.json so a
# transcript can be re-rendered without re-hitting the API.
#
# Output is grouped into speaker turns, each prefixed with a [MM:SS] timestamp:
#   [00:00] Speaker 1: Okay. Test, test, one, two. Does it work?
#   [00:12] Speaker 2: ...

set -euo pipefail

audio_dir=${1:?"usage: $0 <audio_dir> <out_dir> [num_speakers]"}
out_dir=${2:?"usage: $0 <audio_dir> <out_dir> [num_speakers]"}
num_speakers=${3:-}

if [[ -z "${ELEVENLABS_API_KEY:-}" && -f "$HOME/.config/PAI/.env" ]]; then
  ELEVENLABS_API_KEY=$(grep -E '^ELEVENLABS_API_KEY=' "$HOME/.config/PAI/.env" | head -1 | cut -d= -f2-)
fi
: "${ELEVENLABS_API_KEY:?ELEVENLABS_API_KEY not set}"

mkdir -p "$out_dir"

shopt -s nullglob
for audio in "$audio_dir"/*.{mp3,m4a,ogg,mpga,mp4,wav,flac,webm}; do
  base=$(basename "$audio")
  name=${base%.*}
  out="$out_dir/$name.txt"
  raw="$out_dir/$name.json"

  if [[ -f "$out" && -s "$out" ]]; then
    echo "skip  $name (transcript exists)"
    continue
  fi
  if [[ ! -s "$audio" ]]; then
    echo "skip  $name (audio empty/not downloaded)"
    continue
  fi

  size=$(du -h "$audio" | cut -f1)
  echo "xcribe $name ($size)..."

  curl_args=(
    -sS -w '%{http_code}' -o "$raw"
    --max-time 3600
    -X POST https://api.elevenlabs.io/v1/speech-to-text
    -H "xi-api-key: $ELEVENLABS_API_KEY"
    -F "model_id=scribe_v1"
    -F "diarize=true"
    -F "timestamps_granularity=word"
    -F "tag_audio_events=true"
    -F "file=@$audio"
  )
  [[ -n "$num_speakers" ]] && curl_args+=(-F "num_speakers=$num_speakers")

  http=$(curl "${curl_args[@]}")

  if [[ "$http" != "200" ]]; then
    echo "ERROR $name -> HTTP $http" >&2
    head -c 500 "$raw" >&2; echo >&2
    continue
  fi

  python3 "$(dirname "$0")/render-transcript.py" "$raw" "$out"
done

echo "done."
