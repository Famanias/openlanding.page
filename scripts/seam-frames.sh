#!/usr/bin/env bash
# Extracts the two frames a KŌJI connector clip must start and end on.
#
#   bash scripts/seam-frames.sh <n> [clips-dir]      (n = 1..4)
#
# Writes <clips-dir>/seam-<n>-<n+1>/start.png  — the LAST frame of dive-<n>.mp4
#        <clips-dir>/seam-<n>-<n+1>/end.png    — the FIRST frame of dive-<n+1>.mp4
# Give both to Veo (Flow "Frames to Video": first + last frame) when generating conn-<n>-<n+1>.mp4.
set -euo pipefail

n="${1:?usage: seam-frames.sh <n> [clips-dir]}"
dir="${2:-assets/incoming/koji/clips}"
next=$((n + 1))
a="$dir/dive-$n.mp4"
b="$dir/dive-$next.mp4"
out="$dir/seam-$n-$next"

[ -f "$a" ] || { echo "seam-frames: missing $a" >&2; exit 1; }
[ -f "$b" ] || { echo "seam-frames: missing $b" >&2; exit 1; }
mkdir -p "$out"

# -sseof seeks near the end; -update 1 keeps overwriting the file, so the last decoded frame wins.
ffmpeg -v error -y -sseof -0.5 -i "$a" -update 1 "$out/start.png"
ffmpeg -v error -y -i "$b" -frames:v 1 "$out/end.png"
echo "seam-frames: $out/start.png (end of dive-$n), $out/end.png (start of dive-$next)"
