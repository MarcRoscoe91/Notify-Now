diff --git a/notifynow-frontend/js/api.js b/notifynow-frontend/js/api.js
index 73ffe26942c4eec52b4fad6c7ff62446f19524c6..ea0c7231bcbb613e4a778cac48ab01825712cddb 100644
--- a/notifynow-frontend/js/api.js
+++ b/notifynow-frontend/js/api.js
@@ -1,27 +1,27 @@
 // js/api.js
-const API = '/api'; // Netlify proxies to https://api.notify-now.co.uk
+const API = (typeof window !== 'undefined' && window.__NOTIFY_NOW_API__) || '/api';
 
 export async function ping() {
   const r = await fetch(`${API}/`, { credentials: 'include' });
   return r.text();
 }
 
 export async function whoAmI() {
   const r = await fetch(`${API}/api/auth/me`, { credentials: 'include' });
   if (!r.ok) return null;
   return r.json();
 }
 
 export async function requestMagicLink(email) {
   const r = await fetch(`${API}/api/auth/magic-link`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email })
   });
   return r.json();
 }
 
 export async function listItems() {
   const r = await fetch(`${API}/api/items`, { credentials: 'include' });
   if (!r.ok) throw new Error('Failed to fetch items');
   return r.json();
