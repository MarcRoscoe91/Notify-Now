+#!/usr/bin/env bash
+set -euo pipefail
+cd "$(dirname "$0")"
+
+API_BASE="${NOTIFY_NOW_API_BASE:-/api}"
+
+cat > js/config.js <<CONFIG
+window.__NOTIFY_NOW_API__ = "${API_BASE}";
+CONFIG
+
+echo "Wrote js/config.js pointing to ${API_BASE}"
