#!/usr/bin/env bash
# Proves a template works on its own: copy its two folders into a fresh create-next-app,
# install the packages its DESIGN.md lists under "Requirements", and run `next build`.
#
#   bash scripts/copy-unit-check.sh <orrery|cairn|koji>
set -euo pipefail

slug="${1:?usage: copy-unit-check.sh <slug>}"
repo="$(cd "$(dirname "$0")/.." && pwd)"
group="$repo/src/app/($slug)"
design="$group/$slug/DESIGN.md"

[ -d "$group" ] || { echo "copy-unit: no template folder at $group" >&2; exit 1; }
[ -f "$design" ] || { echo "copy-unit: missing $design" >&2; exit 1; }

# The first `npm i …` line inside DESIGN.md's Requirements section.
install_line="$(awk '/^## Requirements/{inside=1; next} /^## /{inside=0} inside && /^npm i /{print; exit}' "$design")"
[ -n "$install_line" ] || { echo "copy-unit: no 'npm i …' line under '## Requirements' in $design" >&2; exit 1; }

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
echo "copy-unit: scaffolding a fresh app in $work"
(cd "$work" && npx -y create-next-app@latest app --ts --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --yes --disable-git >/dev/null 2>&1)

app="$work/app"
rm -f "$app/src/app/layout.tsx" "$app/src/app/page.tsx" "$app/src/app/globals.css" "$app/src/app/favicon.ico"
cp -R "$group" "$app/src/app/"
# Tests travel with the template but need vitest; they are not part of the build check.
find "$app/src/app/($slug)" -name "*.test.ts" -delete
if [ -d "$repo/public/templates/$slug" ]; then
  mkdir -p "$app/public/templates"
  cp -R "$repo/public/templates/$slug" "$app/public/templates/"
fi

echo "copy-unit: $install_line"
(cd "$app" && $install_line >/dev/null 2>&1)
echo "copy-unit: next build"
(cd "$app" && npx next build) > "$work/build.log" 2>&1 || { tail -40 "$work/build.log" >&2; echo "copy-unit: $slug FAILED" >&2; exit 1; }
grep -E "^[├└┌] ." "$work/build.log" || true
echo "copy-unit: $slug ok"
