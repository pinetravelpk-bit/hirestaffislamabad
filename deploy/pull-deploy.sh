#!/usr/bin/env bash
# Pull-based deploy: run on the VPS. Fetches main from GitHub, builds, and
# reloads the site with PM2 — no SSH keys or GitHub secrets needed.
#   bash deploy/pull-deploy.sh            # deploy now
#   bash deploy/pull-deploy.sh --install  # deploy now + auto-deploy every 5 minutes
# Business details (phone, WhatsApp…) go in /etc/hirestaffislamabad.env, e.g.
#   NEXT_PUBLIC_WHATSAPP=923001234567
set -euo pipefail
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR=/var/www/hirestaffislamabad
PORT="${PORT:-3010}"
ENV_FILE=/etc/hirestaffislamabad.env
LOG=/var/log/hirestaffislamabad-deploy.log

exec 9>/tmp/hirestaffislamabad-deploy.lock
flock -n 9 || { echo "Deploy already running"; exit 0; }

if [ "${1:-}" = "--install" ]; then
  touch "$ENV_FILE"
  ( crontab -l 2>/dev/null | grep -v pull-deploy.sh; echo "*/5 * * * * bash $REPO_DIR/deploy/pull-deploy.sh >> $LOG 2>&1" ) | crontab -
  echo "Auto-deploy installed (every 5 minutes). Log: $LOG"
fi

# Online CV pages are stored here (outside releases, so deploys never wipe them)
mkdir -p "${CV_DATA_DIR:-/var/lib/hirestaffislamabad/cv}" && chmod 700 "${CV_DATA_DIR:-/var/lib/hirestaffislamabad/cv}"

cd "$REPO_DIR"
git fetch -q origin main
NEW=$(git rev-parse origin/main)
CUR=$(cat "$APP_DIR/current/.release" 2>/dev/null || true)
if [ "$NEW" = "$CUR" ] && [ "${1:-}" != "--force" ] && [ "${1:-}" != "--install" ]; then exit 0; fi
# Rebuild when the env file changed too
echo "[$(date)] Deploying ${NEW:0:7}"
git checkout -q -B main origin/main
git reset -q --hard origin/main

set -a; [ -f "$ENV_FILE" ] && . "$ENV_FILE"; set +a
npm ci --no-audit --no-fund --loglevel=error
npm run build

REL="$APP_DIR/releases/$(date +%Y%m%d%H%M%S)-${NEW:0:7}"
mkdir -p "$REL"
cp -r .next/standalone/. "$REL/"
cp -r public "$REL/public"
mkdir -p "$REL/.next" && cp -r .next/static "$REL/.next/static"
cp ecosystem.config.cjs "$REL/"
echo "$NEW" > "$REL/.release"
ln -sfn "$REL" "$APP_DIR/current"

cd "$APP_DIR/current"
pm2 delete hirestaffislamabad >/dev/null 2>&1 || true
PORT=$PORT pm2 start ecosystem.config.cjs --update-env
pm2 save >/dev/null
sleep 3
curl -fsS -o /dev/null "http://127.0.0.1:$PORT/" && echo "[$(date)] Site is up on port $PORT"
ls -1dt "$APP_DIR"/releases/* | tail -n +4 | xargs -r rm -rf
