#!/usr/bin/env bash
# Checks every KŌJI connector against the frames it must join (from seam-frames.sh).
# A join passes at PSNR >= 30 dB (scroll-world's threshold for "frame-identical to codec noise").
#
#   bash scripts/seam-check.sh [clips-dir]
#
# Exit 1 if any existing connector misses a seam. Missing connectors are reported as cuts
# (they become a slab wipe in flight.config.ts), not failures.
set -euo pipefail

dir="${1:-assets/incoming/koji/clips}"
THRESHOLD=30
failed=0
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

psnr() { # a.png b.png → average PSNR (inf for identical)
  ffmpeg -v error -i "$1" -i "$2" \
    -lavfi "[0:v]scale=1280:720,format=yuv420p[a];[1:v]scale=1280:720,format=yuv420p[b];[a][b]psnr=stats_file=-" \
    -f null - 2>/dev/null |
    awk '{ for (i = 1; i <= NF; i++) if ($i ~ /^psnr_avg:/) { split($i, kv, ":"); s += (kv[2] == "inf" ? 99 : kv[2]); c++ } }
         END { if (c) printf "%.1f", s / c; else print "0" }'
}

pass() { awk -v v="$1" -v t="$THRESHOLD" 'BEGIN { exit !(v + 0 >= t) }'; }

for n in 1 2 3 4; do
  next=$((n + 1))
  conn="$dir/conn-$n-$next.mp4"
  seam="$dir/seam-$n-$next"
  if [ ! -f "$conn" ]; then
    echo "seam $n→$next: no connector (cut → slab wipe)"
    continue
  fi
  [ -f "$seam/start.png" ] && [ -f "$seam/end.png" ] || { echo "seam $n→$next: run seam-frames.sh $n first" >&2; failed=1; continue; }

  ffmpeg -v error -y -i "$conn" -frames:v 1 "$tmp/first.png"
  ffmpeg -v error -y -sseof -0.5 -i "$conn" -update 1 "$tmp/last.png"
  head="$(psnr "$tmp/first.png" "$seam/start.png")"
  tail="$(psnr "$tmp/last.png" "$seam/end.png")"
  status="ok"
  if ! pass "$head" || ! pass "$tail"; then status="MISS"; failed=1; fi
  echo "seam $n→$next: start ${head} dB, end ${tail} dB → $status"
done

exit "$failed"
