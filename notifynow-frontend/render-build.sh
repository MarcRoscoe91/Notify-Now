diff --git a/notifynow-frontend/render-build.sh b/notifynow-frontend/render-build.sh
new file mode 100755
index 0000000000000000000000000000000000000000..f6ef88ab6fe3b7f418531de343e4dcbc8e86655a
--- /dev/null
+++ b/notifynow-frontend/render-build.sh
@@ -0,0 +1,11 @@
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
