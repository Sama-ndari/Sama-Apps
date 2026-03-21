#!/usr/bin/env bash
set -euo pipefail

DIST="dist"
CSS_DIR="assets/css"
JS_DIR="assets/js"

rm -rf "$DIST"
mkdir -p "$DIST/$CSS_DIR" "$DIST/$JS_DIR" "$DIST/apps"

echo "==> Minifying CSS..."
for f in "$CSS_DIR"/*.css; do
  name=$(basename "$f")
  sed 's/\/\*[^*]*\*\+\([^\/][^*]*\*\+\)*\///g' "$f" \
    | tr '\n' ' ' \
    | sed 's/  */ /g; s/ *{ */{/g; s/ *} */}/g; s/ *: */:/g; s/ *; */;/g; s/;}/}/g' \
    | sed 's/^ *//; s/ *$//' \
    > "$DIST/$CSS_DIR/$name"
  echo "   $name  $(wc -c < "$f" | tr -d ' ')B -> $(wc -c < "$DIST/$CSS_DIR/$name" | tr -d ' ')B"
done

echo "==> Minifying JS..."
for f in "$JS_DIR"/*.js; do
  name=$(basename "$f")
  sed 's|//[^"'\'']*$||g' "$f" \
    | sed 's/\/\*[^*]*\*\+\([^\/][^*]*\*\+\)*\///g' \
    | tr '\n' ' ' \
    | sed 's/  */ /g' \
    | sed 's/^ *//; s/ *$//' \
    > "$DIST/$JS_DIR/$name"
  echo "   $name  $(wc -c < "$f" | tr -d ' ')B -> $(wc -c < "$DIST/$JS_DIR/$name" | tr -d ' ')B"
done

echo "==> Copying HTML + static assets..."
cp -r assets/img "$DIST/assets/" 2>/dev/null || true
cp -r assets/apps "$DIST/assets/" 2>/dev/null || true
cp -r apps "$DIST/apps/" 2>/dev/null || true
cp *.html "$DIST/" 2>/dev/null || true
cp sitemap.xml robots.txt "$DIST/" 2>/dev/null || true
cp CNAME "$DIST/" 2>/dev/null || true

echo "==> Done! Output in $DIST/"
