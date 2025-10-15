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
