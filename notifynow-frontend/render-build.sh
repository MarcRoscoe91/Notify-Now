#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

API_BASE="${NOTIFY_NOW_API_BASE:-/api}"

if [[ "$API_BASE" != "/api" ]]; then
  # Remove trailing slashes
  while [[ "$API_BASE" == */ ]]; do
    API_BASE="${API_BASE%/}"
  done
  # Drop a trailing /api segment if present so requests aren't doubled
  if [[ "$API_BASE" == *"/api" ]]; then
    API_BASE="${API_BASE%/api}"
  fi
fi

cat > js/config.js <<CONFIG
// This file is overwritten by render-build.sh during deployments.
window.__NOTIFY_NOW_API__ = '${API_BASE}';
CONFIG

echo "Wrote js/config.js pointing to ${API_BASE}"
