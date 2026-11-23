#!/usr/bin/env bash
# One-time setup for hirestaffislamabad.pk on an Ubuntu/Debian VPS.
# Run as root:  bash setup-vps.sh you@example.com
# It installs Node.js 22, PM2, Nginx and Certbot, adds an Nginx site for the domain,
# and issues a free Let's Encrypt certificate. It does not touch other Nginx sites.
set -euo pipefail
EMAIL="${1:?Usage: bash setup-vps.sh <email-for-ssl-notices>}"
DOMAIN=hirestaffislamabad.pk
APP_DIR=/var/www/hirestaffislamabad
DEPLOY_USER="${DEPLOY_USER:-root}"

apt-get update
apt-get install -y curl rsync nginx certbot python3-certbot-nginx
if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm install -g pm2
pm2 startup systemd -u "$DEPLOY_USER" --hp "$(getent passwd "$DEPLOY_USER" | cut -d: -f6)" >/dev/null || true

mkdir -p "$APP_DIR/releases"
chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$APP_DIR"

cp "$(dirname "$0")/nginx.conf" /etc/nginx/sites-available/$DOMAIN
ln -sfn /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
nginx -t && systemctl reload nginx

if command -v ufw >/dev/null && ufw status | grep -q active; then ufw allow 'Nginx Full'; fi

certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m "$EMAIL" --redirect
systemctl reload nginx
echo "VPS ready. Push to the main branch (or run the 'Deploy to VPS' workflow) to deploy."
