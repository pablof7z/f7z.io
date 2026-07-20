#!/usr/bin/env bash

set -euo pipefail

download_dir=${1:-"${HOME}/Downloads/no-solutions-pablo"}

mkdir -p "$download_dir"
cd "$download_dir"

# Blossom paths are content-addressed: the path hash is also the expected
# SHA-256 of the downloaded audio. The original haven host was unavailable
# during this transcription run; blossom.primal.net serves the same blobs.
downloads=(
  "00-test-recording-teaser.ogg|d8b969dcdd4e956b581ac66933076b1a9080d219aeddf03110c768bec43e842f|ogg"
  "01-start-ugly.mp3|efd05ea087e894bfa056803f881e8de25e775cee3d65f2ae303c1f282b619a61|mp3"
  "02-there-is-no-global.mp3|454ec3ebf261084fe0abbcb6b31409cb29db23ed97784f896b60d7226bfe17ba|mp3"
  "03-data-ownership-is-a-lie.mp3|d6cba62896e2db1220038210de2941420dbe768cef819327fdd0c55c71b0d46f|mp3"
  "06-the-winds-of-ai.mpga|a4c661358690b68e5cce8583111c8ab3bb9fef1a9e4e1a347cf543b7dc76c4fb|mpga"
  "08-navigating-the-vibe.m4a|163991993992a3ba54e22d8c1516bd2fdec4fb228e698931cb9474b80ced7dc5|m4a"
  "11-10x-less-productive.m4a|12176c5d069e539b4df09f6ab83b7dd49212f78a23d4e1efeb41a36ca9e02992|m4a"
)

for download in "${downloads[@]}"; do
  filename=${download%%|*}
  remainder=${download#*|}
  expected_hash=${remainder%%|*}
  extension=${remainder##*|}
  url="https://blossom.primal.net/${expected_hash}.${extension}"

  if [[ -s "$filename" ]]; then
    actual_hash=$(shasum -a 256 "$filename" | cut -d' ' -f1)
    if [[ "$actual_hash" == "$expected_hash" ]]; then
      echo "Verified $filename"
      continue
    fi
  fi

  echo "Fetching $filename"
  curl --fail --location --retry 5 --retry-delay 3 --output "$filename" "$url"

  actual_hash=$(shasum -a 256 "$filename" | cut -d' ' -f1)
  if [[ "$actual_hash" != "$expected_hash" ]]; then
    echo "error: SHA-256 mismatch for $filename" >&2
    exit 1
  fi
done

echo "Downloaded and verified audio in $download_dir"
