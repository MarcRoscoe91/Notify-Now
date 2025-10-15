// js/api.js
const rawApiBase = (typeof window !== 'undefined' && window.__NOTIFY_NOW_API__) || '/api';

function normalizeApiBase(raw) {
  const trimmed = (raw || '').trim();
  if (!trimmed || trimmed === '/api') {
    return { base: '', absolute: false };
  }

  let base = trimmed.replace(/\/+$/, '');
  const absolute = /^https?:\/\//i.test(base);

  if (base.toLowerCase().endsWith('/api')) {
    const withoutApi = base.slice(0, -4);
    if (withoutApi) {
      base = withoutApi;
    }
  }

  if (!absolute && base && !base.startsWith('/')) {
    base = `/${base}`;
  }

  return { base, absolute };
}

const { base: apiBase, absolute: apiBaseIsAbsolute } = normalizeApiBase(rawApiBase);

function buildApiUrl(path) {
  if (apiBaseIsAbsolute) {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return new URL(normalizedPath, `${apiBase}/`).toString();
  }
  return `${apiBase}${path}`;
}

export async function ping() {
  const r = await fetch(buildApiUrl('/'), { credentials: 'include' });
  return r.text();
}

export async function whoAmI() {
  const r = await fetch(buildApiUrl('/api/auth/me'), { credentials: 'include' });
  if (!r.ok) return null;
  return r.json();
}

export async function requestMagicLink(email) {
  const r = await fetch(buildApiUrl('/api/auth/magic-link'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return r.json();
}

export async function listItems() {
  const r = await fetch(buildApiUrl('/api/items'), { credentials: 'include' });
  if (!r.ok) throw new Error('Failed to fetch items');
  return r.json();
}

export async function addItem(payload) {
  const r = await fetch(buildApiUrl('/api/items'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return r.json();
}
